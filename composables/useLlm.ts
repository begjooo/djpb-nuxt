import { sign } from "crypto";
import { response } from "express";
interface llmProcessor {
  (prompt: string): Promise<string>;
}

function useSelectedModel() {
  const { sessionId } = useSession();
  const selectedModel = useState<string>("selectedModel", () => "");
  const savingSelectedModel = useState<boolean>(
    "savingSelectedModel",
    () => false
  );
  function getSelectedModel() {
    $fetch(`/api/graph/session/${sessionId}/gemini/selected-model`).then(
      (response) => {
        selectedModel.value = response;
      }
    );
  }
  async function saveSelectedModel(selectedModel: string) {
    savingSelectedModel.value = true;
    await $fetch(`/api/graph/session/${sessionId}/gemini/selected-model`, {
      method: "POST",
      body: JSON.stringify({ selectedModel }),
    });
    savingSelectedModel.value = false;
  }
  return {
    selectedModel,
    getSelectedModel,
    savingSelectedModel,
    saveSelectedModel,
  };
}

function usePrompt() {
  const { sessionId } = useSession();
  const currentPrompt = useState<string>("current-prompt", () => "");
  const promptLists = useState<string[]>("prompt-lists", () => []);

  function getPrompts() {
    $fetch(`/api/graph/session/${sessionId}/prompt`).then((response) => {
      promptLists.value = response.prompts;
      currentPrompt.value = response.prompt;
    });
  }

  async function savePrompt(prompt: string) {
    await $fetch(`/api/graph/session/${sessionId}/prompt`, {
      method: "POST",
      body: JSON.stringify({ prompt }),
      onResponse: () => {
        currentPrompt.value = prompt;
      },
    });
  }

  return { currentPrompt, promptLists, savePrompt, getPrompts };
}

export async function useLlm() {
  console.log("useLlm called");
  const nuxtContext = useNuxtApp();
  const { sessionId } = useSession();
  const promptResult = useState<string>("prompt-result", () => "");
  const requesting = useState<boolean>("requesting", () => false);

  const { currentPrompt, promptLists, savePrompt, getPrompts } = usePrompt();
  const {
    selectedModel,
    getSelectedModel,
    savingSelectedModel,
    saveSelectedModel,
  } = useSelectedModel();


  await callOnce(getPrompts);
  nuxtContext.runWithContext(async () => await callOnce(getSelectedModel));

  let controller: AbortController;

  async function processLlm(prompt: string) {
    console.log("processLlm called");
    controller = new AbortController();
    requesting.value = true;
    const response: ReadableStream = await $fetch(
      `/api/graph/session/${sessionId}/gemini/chat`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          selectedModel: selectedModel.value,
        }),
        responseType: "stream",
        signal: controller.signal,
      }
    );
    promptResult.value = "";
    const reader = response.pipeThrough(new TextDecoderStream()).getReader();
    const decoder = new TextDecoder(); // Assuming text data
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;
      // const chunkString = decoder.decode(value);
      promptResult.value += value;
    }
    requesting.value = false;
  }
  async function abortLlm() {
    // await $fetch(`/api/graph/session/${sessionId}/gemini/chat`, {
    //   method: "DELETE",
    // });
    controller.abort("User aborted");
    requesting.value = false;
  }

  return {
    promptResult,
    processLlm,
    currentPrompt,
    promptLists,
    savePrompt,
    requesting,
    selectedModel,
    saveSelectedModel,
    getSelectedModel,
    getPrompts,
    savingSelectedModel,
    abortLlm,
  };
}