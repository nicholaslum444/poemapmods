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
  let modsTextArr = modDetails.trim().split('\n');
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

  // prefix
  r.abhorrent = /Area is inhabited by Abominations/;
  r.anachic = /Area is inhabited by \d* additional Rogue Exiles/;
  r.anatagonist1 = /Rare Monsters each have a Nemesis Mod/;
  r.anatagonist2 = /\d*% more Rare Monsters/;
  r.bipedal = /Area is inhabited by Humanoids/;
  r.capricious = /Area is inhabited by Goatmen/;
  r.ceremonial = /Area contains many Totems/;
  r.chaining = /Monsters' skills Chain 2 additional times/;
  r.conflagrating = /All Monster Damage from Hits always Ignites/;
  r.demonic = /Area is inhabited by Demons/;
  r.emanant = /Area is inhabited by ranged monsters/;
  r.feral = /Area is inhabited by Animals/;
  r.haunting = /Area is inhabited by Ghosts/;
  r.lunar = /Area is inhabited by Lunaris fanatics/;
  r.multifarious = /Area has increased monster variety/;
  r.otherworldy = /Slaying Enemies close together can attract monsters from Beyond/;
  r.skeletal = /Area is inhabited by Skeletons/;
  r.slithering = /Area is inhabited by Sea Witches and their Spawn/;
  r.solar = /Area is inhabited by Solaris fanatics/;
  r.twinned = /Area contains two Unique Bosses/;
  r.undead = /Area is inhabited by Undead/;
  r.unstoppable1 = /Monsters cannot be slowed below base speed/;
  r.unstoppable2 = /Monsters cannot be Taunted/;
  r.armoured = /\+\d*% Monster Physical Damage Reduction/;
  r.burning = /Monsters deal \d*% extra Damage as Fire/;
  r.empowered = /Monsters have a \d*% chance to cause Elemental Ailments on Hit/;
  r.fecund = /\d*% more Monster Life/;
  r.fleet1 = /\d*% increased Monster Movement Speed/;
  r.fleet2 = /\d*% increased Monster Attack Speed/;
  r.fleet3 = /\d*% increased Monster Cast Speed/;
  r.freezing = /Monsters deal \d*% extra Damage as Cold/;
  r.hexwarded = /25% less effect of Curses on Monsters/;
  r.impervious = /Monsters have a \d*% chance to avoid Poison, Blind, and Bleed/;
  r.mirrored = /Monsters reflect \d*% of Elemental Damage/;
  r.overlords1 = /Unique Boss deals \d*% increased Damage/;
  r.overlords2 = /Unique Boss has \d*% increased Attack and Cast Speed/;
  r.punishing = /Monsters reflect \d*% of Physical Damage/;
  r.resistant1 = /\+\d*% Monster Chaos Resistance/;
  r.resistant2 = /\+\d*% Monster Elemental Resistance/;
  r.savage = /\d*% increased Monster Damage/;
  r.shocking = /Monsters deal \d*% extra Damage as Lightning/;
  r.splitting = /Monsters fire \d* additional Projectiles/;
  r.titans1 = /Unique Boss has \d*% increased Life/;
  r.titans2 = /Unique Boss has \d*% increased Area of Effect/;
  r.unwavering1 = /Monsters cannot be Stunned/;
  r.unwavering2 = /\d*% more Monster Life/;

  // suffix
  r.balance = /Players have Elemental Equilibrium/;
  r.bloodlines1 = /\d*% more Magic Monsters/;
  r.bloodlines2 = /Magic Monster Packs each have a Bloodline Mod/;
  r.venom = /Monsters Poison on Hit/;
  r.deadlines1 = /Monsters have \d*% increased Critical Strike Chance/;
  r.deadlines2 = /\+\d*% to Monster Critical Strike Multiplier/;
  r.desecration = /Area has patches of desecrated ground/;
  r.drought = /Players gain \d*% reduced Flask Charges/;
  r.flames = /Area has patches of burning ground/;
  r.giants = /Monsters have \d*% increased Area of Effect/;
  r.ice = /Area has patches of chilled ground/;
  r.impotence = /Players have \d*% less Area of Effect/;
  r.insulation = /Monsters have \d*% chance to Avoid Elemental Ailments/;
  r.lightning = /Area has patches of shocking ground/;
  r.miring1 = /Player Dodge chance is Unlucky/;
  r.miring2 = /Monsters have \d*% increased Accuracy Rating/;
  r.rust1 = /Players have \d*% reduced Block Chance/;
  r.rust2 = /Players have \d*% less Armour/;
  r.smothering = /Players have \d*% less Recovery Rate of Life and Energy Shield/;
  r.toughness = /Monsters take \d*% reduced Extra Damage from Critical Strikes/;
  r.deadliness1 = /Monsters have \d*% increased Critical Strike Chance/;
  r.deadliness2 = /\+\d*% to Monster Critical Strike Multiplier/;
  r.desecration = /Area has patches of desecrated ground/;
  r.elementalweakness = /Players are Cursed with Elemental Weakness/;
  r.enfeeblement = /Players are Cursed with Enfeeble/;
  r.exposure = /-\d*% maximum Player Resistances/;
  r.stasis = /Players cannot Regenerate Life, Mana or Energy Shield/;
  r.temporalchains = /Players are Cursed with Temporal Chains/;
  r.toughness = /Monsters take \d*% reduced Extra Damage from Critical Strikes/;
  r.vulnerability = /Players are Cursed with Vulnerability/;
  r.congealment1 = /Cannot Leech Life from Monsters/;
  r.congealment2 = /Cannot Leech Mana from Monsters/;
  r.vulnerability = /Players are Cursed with Vulnerability/;

  switch (true) {
    // prefix
    case r.abhorrent.test(modText):
      return 'abhorrent';

    case r.anachic.test(modText):
      return 'anachic';

    case r.anatagonist1.test(modText):
    case r.anatagonist2.test(modText):
      return 'anatagonist';

    case r.bipedal.test(modText):
      return 'bipedal';

    case r.capricious.test(modText):
      return 'capricious';

    case r.ceremonial.test(modText):
      return 'ceremonial';

    case r.chaining.test(modText):
      return 'chaining';

    case r.conflagrating.test(modText):
      return 'conflagrating';

    case r.demonic.test(modText):
      return 'demonic';

    case r.emanant.test(modText):
      return 'emanant';

    case r.feral.test(modText):
      return 'feral';

    case r.haunting.test(modText):
      return 'haunting';

    case r.lunar.test(modText):
      return 'lunar';

    case r.multifarious.test(modText):
      return 'multifarious';

    case r.otherworldy.test(modText):
      return 'otherworldy';

    case r.skeletal.test(modText):
      return 'skeletal';

    case r.slithering.test(modText):
      return 'slithering';

    case r.solar.test(modText):
      return 'solar';

    case r.twinned.test(modText):
      return 'twinned';

    case r.undead.test(modText):
      return 'undead';

    case r.unstoppable1.test(modText):
    case r.unstoppable2.test(modText):
      return 'unstoppable';

    case r.armoured.test(modText):
      return 'armoured';

    case r.burning.test(modText):
      return 'burning';

    case r.empowered.test(modText):
      return 'empowered';

    case r.fecund.test(modText):
      return 'fecund';

    case r.fleet1.test(modText):
    case r.fleet2.test(modText):
    case r.fleet3.test(modText):
      return 'fleet';

    case r.freezing.test(modText):
      return 'freezing';

    case r.hexwarded.test(modText):
      return 'hexwarded';

    case r.impervious.test(modText):
      return 'impervious';

    case r.mirrored.test(modText):
      return 'mirrored';

    case r.overlords1.test(modText):
    case r.overlords2.test(modText):
      return 'overlords';

    case r.punishing.test(modText):
      return 'punishing';

    case r.resistant1.test(modText):
    case r.resistant2.test(modText):
      return 'resistant';

    case r.savage.test(modText):
      return 'savage';

    case r.shocking.test(modText):
      return 'shocking';

    case r.splitting.test(modText):
      return 'splitting';

    case r.titans1.test(modText):
    case r.titans2.test(modText):
      return 'titans';

    case r.unwavering1.test(modText):
    case r.unwavering2.test(modText):
      return 'unwavering';

    // suffix
    case r.balance.test(modText):
      return 'of balance';

    case r.bloodlines1.test(modText):
    case r.bloodlines2.test(modText):
      return 'of bloodlines';

    case r.venom.test(modText):
      return 'of venom';

    case r.deadlines1.test(modText):
    case r.deadlines2.test(modText):
      return 'of deadlines';

    case r.desecration.test(modText):
      return 'of desecration';

    case r.drought.test(modText):
      return 'of drought';

    case r.flames.test(modText):
      return 'of flames';

    case r.giants.test(modText):
      return 'of giants';

    case r.ice.test(modText):
      return 'of ice';

    case r.impotence.test(modText):
      return 'of impotence';

    case r.insulation.test(modText):
      return 'of insulation';

    case r.lightning.test(modText):
      return 'of lightning';

    case r.miring1.test(modText):
    case r.miring2.test(modText):
      return 'of miring';

    case r.rust1.test(modText):
    case r.rust2.test(modText):
      return 'of rust';

    case r.smothering.test(modText):
      return 'of smothering';

    case r.toughness.test(modText):
      return 'of toughness';

    case r.deadliness1.test(modText):
    case r.deadliness2.test(modText):
      return 'of deadliness';

    case r.desecration.test(modText):
      return 'of desecration';

    case r.elementalweakness.test(modText):
      return 'of elementalweakness';

    case r.enfeeblement.test(modText):
      return 'of enfeeblement';

    case r.exposure.test(modText):
      return 'of exposure';

    case r.stasis.test(modText):
      return 'of stasis';

    case r.temporalchains.test(modText):
      return 'of temporalchains';

    case r.toughness.test(modText):
      return 'of toughness';

    case r.vulnerability.test(modText):
      return 'of vulnerability';

    case r.congealment1.test(modText):
    case r.congealment2.test(modText):
      return 'of congealment';

    case r.vulnerability.test(modText):
      return 'of vulnerability';

    // no match
    default:
      return false;
  }
}
