//Created by M. Francis - 2020

const emojis = new Map();

//Full (official) list of emojis: https://unicode.org/emoji/charts/full-emoji-list.html
//No, I will not be adding every single emoji. Just some facial ones for now. If I have time later,
//I will update this list with more emojis using :emoji: format. But this project is more of a
//test, and so I will not be putting in that effort right now. (I might later)

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//Smiling face
emojis.set(":)", String.fromCodePoint(0x1f642));
emojis.set(":-)", String.fromCodePoint(0x1f642));
emojis.set("=)", String.fromCodePoint(0x1f642));
emojis.set("=-)", String.fromCodePoint(0x1f642));
//Grining face
emojis.set(":D", String.fromCodePoint(0x1f600));
emojis.set(":-D", String.fromCodePoint(0x1f600));
emojis.set("=D", String.fromCodePoint(0x1f601));
emojis.set("=-D", String.fromCodePoint(0x1f601));
//Winking face
emojis.set(";)", String.fromCodePoint(0x1f609));
emojis.set(";-)", String.fromCodePoint(0x1f609));
//Grinning squinting face
emojis.set("XD", String.fromCodePoint(0x1f606));
emojis.set("X-D", String.fromCodePoint(0x1f606));
//Rolling on floor laughing (this is a newer emoji and may not display on all browsers)
emojis.set("X'D", String.fromCodePoint(0x1f606));
emojis.set("X'-D", String.fromCodePoint(0x1f606));
//Smiling face with tear (this is a newer emoji and may not display on all browsers)
emojis.set(":')", String.fromCodePoint(0x1f972));
emojis.set(":'-)", String.fromCodePoint(0x1f972));
emojis.set("=')", String.fromCodePoint(0x1f972));
emojis.set("='-)", String.fromCodePoint(0x1f972));
//Smiling face with halo
emojis.set("0:)", String.fromCodePoint(0x1f607));
emojis.set("0:-)", String.fromCodePoint(0x1f607));
emojis.set("0=)", String.fromCodePoint(0x1f607));
emojis.set("0=-)", String.fromCodePoint(0x1f607));
emojis.set("O:)", String.fromCodePoint(0x1f607));
emojis.set("O:-)", String.fromCodePoint(0x1f607));
emojis.set("O=)", String.fromCodePoint(0x1f607));
emojis.set("O=-)", String.fromCodePoint(0x1f607));
//Face with tongue
emojis.set(":P", String.fromCodePoint(0x1f61b));
emojis.set(":-P", String.fromCodePoint(0x1f61b));
emojis.set("=P", String.fromCodePoint(0x1f61b));
emojis.set("=-P", String.fromCodePoint(0x1f61b));
//Winking face with tongue
emojis.set(";P", String.fromCodePoint(0x1f61b));
emojis.set(";-P", String.fromCodePoint(0x1f61b));
//Neutral face
emojis.set(":|", String.fromCodePoint(0x1f610));
emojis.set(":-|", String.fromCodePoint(0x1f610));
emojis.set("=|", String.fromCodePoint(0x1f610));
emojis.set("=-|", String.fromCodePoint(0x1f610));
//Smiling face with sunglasses
emojis.set("B)", String.fromCodePoint(0x1f60e));
emojis.set("B-)", String.fromCodePoint(0x1f60e));
//Concerned face
emojis.set(":/", String.fromCodePoint(0x1f615));
emojis.set(":-/", String.fromCodePoint(0x1f615));
emojis.set("=/", String.fromCodePoint(0x1f615));
emojis.set("=-/", String.fromCodePoint(0x1f615));
emojis.set(":\\", String.fromCodePoint(0x1f615));
emojis.set(":-\\", String.fromCodePoint(0x1f615));
emojis.set("=\\", String.fromCodePoint(0x1f615));
emojis.set("=-\\", String.fromCodePoint(0x1f615));
//Slightly frowning face
emojis.set(":(", String.fromCodePoint(0x1f641));
emojis.set(":-(", String.fromCodePoint(0x1f641));
emojis.set("=(", String.fromCodePoint(0x1f641));
emojis.set("=-(", String.fromCodePoint(0x1f641));
//Face with mouth open
emojis.set(":O", String.fromCodePoint(0x1f62e));
emojis.set(":-O", String.fromCodePoint(0x1f62e));
emojis.set("=O", String.fromCodePoint(0x1f62e));
emojis.set("=-O", String.fromCodePoint(0x1f62e));
emojis.set(":0", String.fromCodePoint(0x1f62e));
emojis.set(":-0", String.fromCodePoint(0x1f62e));
emojis.set("=0", String.fromCodePoint(0x1f62e));
emojis.set("=-0", String.fromCodePoint(0x1f62e));
//Crying face
emojis.set(":'(", String.fromCodePoint(0x1f622));
emojis.set(":'-(", String.fromCodePoint(0x1f622));
emojis.set("='(", String.fromCodePoint(0x1f622));
emojis.set("='-(", String.fromCodePoint(0x1f622));
//Angry face
emojis.set(">:(", String.fromCodePoint(0x1f620));
emojis.set(">:-(", String.fromCodePoint(0x1f620));
emojis.set(">=(", String.fromCodePoint(0x1f620));
emojis.set(">=-(", String.fromCodePoint(0x1f620));
//Smiling face with horns
emojis.set(">:)", String.fromCodePoint(0x1f608));
emojis.set(">:-)", String.fromCodePoint(0x1f608));
emojis.set(">=)", String.fromCodePoint(0x1f608));
emojis.set(">=-)", String.fromCodePoint(0x1f608));
//Grinning cat
emojis.set(":3", String.fromCodePoint(0x1f63a));
emojis.set(":-3", String.fromCodePoint(0x1f63a));
emojis.set("=3", String.fromCodePoint(0x1f63a));
emojis.set("=-3", String.fromCodePoint(0x1f63a));
//Cat with tears of joy
emojis.set(":'3", String.fromCodePoint(0x1f639));
emojis.set(":'-3", String.fromCodePoint(0x1f639));
emojis.set("='3", String.fromCodePoint(0x1f639));
emojis.set("='-3", String.fromCodePoint(0x1f639));
//Cat with wry smile
emojis.set(">:3", String.fromCodePoint(0x1f63c));
emojis.set(">:-3", String.fromCodePoint(0x1f63c));
emojis.set(">=3", String.fromCodePoint(0x1f63c));
emojis.set(">=-3", String.fromCodePoint(0x1f63c));
//Red heart
emojis.set("<3", String.fromCodePoint(2764));
//Broken heart
emojis.set("</3", String.fromCodePoint(0x1f494));
emojis.set("<\\3", String.fromCodePoint(0x1f494));