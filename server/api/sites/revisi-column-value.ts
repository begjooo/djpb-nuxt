export default defineEventHandler(async (event) => {
  const { driveItemId, field, value } = await readBody(event);
  console.log(`\n/api/sites/revisi-column-value for ${field} of ${driveItemId}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);
  let nilaiAi = JSON.parse(file.fields['NilaiAI']);
  // console.log(nilaiAi);

  if(field === 'ketepatanWaktu'){
    console.log('revisi ketepatan waktu');
    nilaiAi[field].nilai = value;
    nilaiAi[field].nilaiAkhir = value * 0.08;
  } else if(field === 'format'){
    console.log('revisi format');
    nilaiAi.administratif[field].nilai = value;
  } else if(field === 'desain'){
    console.log('revisi desain');
    nilaiAi.administratif[field].nilai = value;
  } else if(field === 'penulisan'){
    console.log('revisi penulisan');
    nilaiAi.administratif[field].nilai = value;
  } else if(field === 'nondjpb'){
    console.log('revisi nondjpb');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'pemda'){
    console.log('revisi pemda');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'pejabat'){
    console.log('revisi pejabat');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'bidang'){
    console.log('revisi bidang');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'publikasi'){
    console.log('revisi publikasi');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'forum'){
    console.log('revisi forum');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'inovasi'){
    console.log('revisi inovasi');
    nilaiAi.substantif[field].nilai = value;
  } else if(field === 'rekomendasi'){
    console.log('revisi rekomendasi');
    nilaiAi.substantif[field].nilai = value;
  };
  
  // console.log(nilaiAi.administratif.desain.nilai);
  // console.log(nilaiAi.administratif.format.nilai);
  // console.log(nilaiAi.administratif.penulisan.nilai);
  
  nilaiAi.administratif.nilai = (nilaiAi.administratif.format.nilai * 0.2)
    + (nilaiAi.administratif.desain.nilai * 0.3)
    + (nilaiAi.administratif.penulisan.nilai * 0.3);
  nilaiAi.administratif.nilaiAkhir = nilaiAi.administratif.nilai * 0.4;
  
  // console.log(nilaiAi.substantif.nondjpb.nilai);
  // console.log(nilaiAi.substantif.pemda.nilai);
  // console.log(nilaiAi.substantif.pejabat.nilai);
  // console.log(nilaiAi.substantif.bidang.nilai);
  // console.log(nilaiAi.substantif.publikasi.nilai);
  // console.log(nilaiAi.substantif.forum.nilai);
  // console.log(nilaiAi.substantif.inovasi.nilai);
  // console.log(nilaiAi.substantif.rekomendasi.nilai);
  
  nilaiAi.substantif.nilai = (nilaiAi.substantif.nondjpb.nilai * 0.05) +
    (nilaiAi.substantif.pemda.nilai * 0.12) +
    (nilaiAi.substantif.pejabat.nilai * 0.12) +
    (nilaiAi.substantif.bidang.nilai * 0.15) +
    (nilaiAi.substantif.publikasi.nilai * 0.12) +
    (nilaiAi.substantif.forum.nilai * 0.12) +
    (nilaiAi.substantif.inovasi.nilai * 0.12) +
    (nilaiAi.substantif.rekomendasi.nilai * 0.2);
  nilaiAi.substantif.nilaiAkhir = nilaiAi.substantif.nilai * 0.6;

  // console.log(nilaiAi.ketepatanWaktu.nilaiAkhir);
  // console.log(nilaiAi.administratif.nilaiAkhir);
  // console.log(nilaiAi.substantif.nilaiAkhir);

  nilaiAi.total = nilaiAi.ketepatanWaktu.nilaiAkhir 
    + nilaiAi.administratif.nilaiAkhir 
    + nilaiAi.substantif.nilaiAkhir;
  
  console.log(nilaiAi);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiAdministratif': nilaiAi.administratif.nilaiAkhir,
    'NilaiSubstantif': nilaiAi.substantif.nilaiAkhir,
    'Nilai': nilaiAi.total,
    'NilaiAI': JSON.stringify(nilaiAi),
  });
  console.log(`${file.name} was revised`);

  file = await graphHandler.getDriveItem(driveItemId);
  return file; 
});