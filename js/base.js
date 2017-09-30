$(function(){
  $('#map-form').keydown(function(event) {
    if (event.ctrlKey && event.keyCode === 13) {
      $(this).trigger('submit');
    }
  })
})

function processMapMods(form) {
  let mapText = $(form).find('textarea')[0].value
  let mapDetails = mapText.split('--------\n');
  let mapRarity = mapDetails[0].split('\n')[0];
  let modCount = countMapMods(mapDetails[3]);

  updatePage(mapRarity, modCount);
  return false;
}

function updatePage(mapRarity, modCount) {
  $('#map-rarity').text(mapRarity);
  $('#mod-count').text(modCount);
}

function countMapMods(modDetails) {
  let count = 0;
  let modGroups = {};
  let modsTextArr = modDetails.split('\n');
  for (let modText of modsTextArr) {
    console.log(modText);
    modGroup = getModGroup(modText);
    console.log(modGroup);
    if (modGroup) {
      modGroups[modGroup] = modGroup;
    }
    console.log(modGroups);
  }
  for (let modGroup in modGroups) {
    count++;
  }
  return count;
}

function getModGroup(modText) {
  // set up the regex
  let r = {};
  r.ofFlames = /Area has patches of burning ground/
  r.spltting = /Monsters fire 2 additional Projectiles/


  switch (true) {
    case r.ofFlames.test(modText):
      return 'of flames';
    case r.spltting.test(modText):
      return 'splitting';
    default:
      return false;
  }
}
