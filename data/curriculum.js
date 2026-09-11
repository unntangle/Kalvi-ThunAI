// Sample curriculum used by the in-page phone demo.
// Shape: raw[class][subjectId] = [ [chapterTitle, [ [concept, summary, keyLine, "step | step | step", avType, youtubeId?] ] ] ]
// avType drives the little animation in the audio-visual player: bar | grid | cycle | stack | map
// youtubeId is optional. Add one and the player shows the video tab for that concept.

import { seniorRaw } from "./senior";
import { class10Raw } from "./class10";

export const CLASSES = [
  { id: 6, tamil: "வகுப்பு 6" },
  { id: 7, tamil: "வகுப்பு 7" },
  { id: 8, tamil: "வகுப்பு 8" },
  { id: 9, tamil: "வகுப்பு 9" },
  { id: 10, tamil: "வகுப்பு 10" },
  { id: 11, tamil: "வகுப்பு 11" },
  { id: 12, tamil: "வகுப்பு 12" },
];

// The chip colour is the only place subject colour is used. Everything else stays neutral.
// Tamil sits last in every list, matching how the school timetable reads.
export const SUBJECTS = [
  { id: "maths", name: "Maths", tamil: "கணிதம்", color: "#6A3FA0" },
  { id: "science", name: "Science", tamil: "அறிவியல்", color: "#0E7C66" },
  { id: "english", name: "English", tamil: "ஆங்கிலம்", color: "#1F6FB2" },
  { id: "social", name: "Social Science", tamil: "சமூக அறிவியல்", color: "#B4711A" },
  { id: "physics", name: "Physics", tamil: "இயற்பியல்", color: "#2A5FA8" },
  { id: "chemistry", name: "Chemistry", tamil: "வேதியியல்", color: "#157A6E" },
  { id: "biology", name: "Biology", tamil: "உயிரியல்", color: "#3E7C2A" },
  { id: "compsci", name: "Computer Science", tamil: "கணினி அறிவியல்", color: "#5B4BC4" },
  { id: "accountancy", name: "Accountancy", tamil: "கணக்குப்பதிவியல்", color: "#A85A12" },
  { id: "commerce", name: "Commerce", tamil: "வணிகவியல்", color: "#0E6E8C" },
  { id: "economics", name: "Economics", tamil: "பொருளியல்", color: "#9A3B7A" },
  { id: "busmaths", name: "Business Maths", tamil: "வணிகக் கணிதம்", color: "#7A4B9E" },
  { id: "tamil", name: "Tamil", tamil: "தமிழ்", color: "#A23246" },
];

// Classes 11 and 12 are taught in groups. Classes 6 to 10 share one core list.
// English sits third and Tamil last, so the two language papers do not open the list.
export const CORE_SUBJECTS = ["maths", "science", "english", "social", "tamil"];

export const GROUPS = [
  {
    id: "bio",
    name: "Biology group",
    tamil: "உயிரியல் குழு",
    note: "Physics, Chemistry, Biology and Maths",
    subjects: ["english", "physics", "chemistry", "biology", "maths", "tamil"],
  },
  {
    id: "cs",
    name: "Computer science group",
    tamil: "கணினி அறிவியல் குழு",
    note: "Physics, Chemistry, Maths and Computer Science",
    subjects: ["english", "physics", "chemistry", "maths", "compsci", "tamil"],
  },
  {
    id: "commerce",
    name: "Commerce group",
    tamil: "வணிகவியல் குழு",
    note: "Accountancy, Commerce, Economics and Business Maths",
    subjects: ["english", "accountancy", "commerce", "economics", "busmaths", "tamil"],
  },
];

export function hasGroups(classId) {
  return Number(classId) >= 11;
}

export function subjectsFor(classId, groupId) {
  const ids = hasGroups(classId)
    ? GROUPS.find((g) => g.id === groupId)?.subjects ?? []
    : CORE_SUBJECTS;
  return ids.map((id) => SUBJECTS.find((s) => s.id === id)).filter(Boolean);
}

const raw = {
  6: {
    tamil: [
      ["எழுத்துகள் — the Tamil alphabet", [
        ["உயிர் எழுத்து (vowels)", "Twelve vowels carry the sound on their own, and every other letter leans on them.", "12 உயிர் = 5 குறில் + 7 நெடில்", "Say அ, ஆ, இ, ஈ aloud | Short sounds are குறில், long ones நெடில் | அ is குறில், ஆ is its நெடில் pair", "stack"],
        ["மெய் எழுத்து (consonants)", "The eighteen consonants each wear a dot and cannot be spoken without a vowel behind them.", "18 மெய் + 12 உயிர் = 216 உயிர்மெய்", "Take க் | Add the vowel அ | You get க, one of 216 உயிர்மெய் letters", "grid"],
      ]],
      ["சொல் வகை — kinds of words", [
        ["பெயர்ச்சொல் (noun)", "A word that names a person, place, thing or quality is a பெயர்ச்சொல்.", "பெயர்ச்சொல் = name word", "Read: கண்ணன் பள்ளிக்குச் சென்றான் | Ask who or what is named | கண்ணன் and பள்ளி are பெயர்ச்சொல்", "stack"],
        ["வினைச்சொல் (verb)", "A word that reports an action and carries tense is a வினைச்சொல்.", "வினை = செயல் + காலம்", "Look at சென்றான் | The action is செல் | The ending ‑றான் fixes it in past tense", "cycle"],
      ]],
      ["பாட்டும் பொருளும் — sound in poetry", [
        ["மோனை", "When lines begin with the same first letter, the poem gets its மோனை.", "Same first எழுத்து at the start of lines", "Look at the first letter of each line | Both begin with ம | That repetition is மோனை", "bar"],
        ["எதுகை", "When the second letter of each line matches, that pairing is எதுகை.", "Same second எழுத்து in each line", "Check the second letter, not the first | Both lines carry ற | That match is எதுகை", "bar"],
      ]],
    ],
    english: [
      ["Nouns and pronouns", [
        ["Countable and uncountable nouns", "Some nouns can be counted one by one, others are measured instead.", "a/an + countable · some/much + uncountable", "Take book and water | You can say two books | You cannot say two waters, so you say some water", "stack"],
        ["Subject pronouns", "A pronoun stands in for a noun so you do not repeat the name in every sentence.", "I, you, he, she, it, we, they", "Meena won the race | Replace the name in the next sentence | She ran the last lap fastest", "cycle"],
      ]],
      ["Simple tenses", [
        ["Simple present", "Use the simple present for habits, routines and facts that stay true.", "he / she / it takes an ‑s", "Start with: I walk to school | Change the subject to Ravi | Ravi walks to school", "bar"],
        ["Simple past", "Use the simple past for an action finished at a known time.", "regular verbs add ‑ed", "Today: I finish my homework | Move it to yesterday | Yesterday I finished my homework", "bar"],
      ]],
      ["Reading a story", [
        ["Finding the main idea", "The main idea is the one sentence that the rest of the passage exists to support.", "Main idea = topic + what is said about it", "Read the passage once without stopping | Ask what every line is talking about | Say it back in one sentence of your own", "stack"],
        ["Guessing word meaning", "The words around an unknown word usually tell you what it means.", "Use the clue words before and after", "Meet a new word in a line | Read the sentence before and after | Choose the meaning that keeps the sentence sensible", "cycle"],
      ]],
    ],
    maths: [
      ["Numbers", [
        ["Place value in large numbers", "Every digit is worth ten times the digit on its right, and that is what makes a numeral readable.", "Value = digit × its place", "Write 3,04,517 | The 4 sits in the thousands place | Its value is 4 × 1000 = 4000", "bar"],
        ["Comparing numbers", "Line two numbers up from the left, and the first digit that differs decides the bigger one.", "Compare place by place from the left", "Compare 45,203 and 45,120 | They agree up to the hundreds place | 2 > 1, so 45,203 is bigger", "bar"],
      ]],
      ["Introduction to algebra", [
        ["Using a letter for a number", "A letter is a placeholder for a number you do not know yet.", "unknown value → x", "Ravi has 5 more marbles than Anu | Call Anu's marbles x | Ravi has x + 5", "stack"],
        ["Making a simple expression", "Turn the words of a problem into symbols, one phrase at a time.", "twice a number → 2n", "A pen costs n rupees | Three pens cost 3 × n | The expression is 3n", "grid"],
      ]],
      ["Ratio and proportion", [
        ["Writing a ratio", "A ratio compares two amounts of the same kind, in the order they are named.", "a : b", "12 boys and 18 girls | Divide both by 6 | The ratio is 2 : 3", "bar"],
        ["Unitary method", "Find the value of one unit first, then scale up to as many as you need.", "one first, then many", "5 notebooks cost ₹150 | One notebook costs 150 ÷ 5 = ₹30 | Eight notebooks cost 8 × 30 = ₹240", "grid"],
      ]],
    ],
    science: [
      ["Measurements", [
        ["SI units", "One agreed set of units lets a reading taken in Chennai mean the same in Chengalpattu.", "length m · mass kg · time s", "Measure a desk as 120 cm | Convert to the SI unit | 120 cm = 1.2 m", "bar"],
        ["Least count", "The smallest reading an instrument can show sets how precise your measurement can be.", "least count = smallest division", "A ruler is marked every 1 mm | So the least count is 0.1 cm | You cannot honestly report 2.53 cm with it", "grid"],
      ]],
      ["Force and motion", [
        ["Balanced and unbalanced forces", "Motion changes only when the forces on an object do not cancel out.", "net force = 0 → no change in motion", "Two teams pull with 300 N each | The forces cancel | The rope stays still", "cycle"],
        ["Friction", "Friction is the force between two surfaces in contact that resists sliding.", "rougher surface → more friction", "Roll a ball on the floor | The surfaces rub against each other | The ball slows and stops", "bar"],
      ]],
      ["Matter around us", [
        ["Three states of matter", "Particle spacing decides whether matter holds its shape, its volume, or neither.", "solid → liquid → gas", "Heat ice | Particles gain energy and move apart | Ice becomes water, then steam", "cycle"],
        ["Solutions", "A solution is one substance spread evenly through another so you cannot see the difference.", "solute + solvent = solution", "Stir sugar into water | The sugar spreads through evenly | The mixture is a solution", "stack"],
      ]],
    ],
    social: [
      ["Sources of ancient India", [
        ["Archaeological sources", "Coins, tools, pottery and buildings tell us what people did, not only what they wrote.", "material remains = archaeological source", "A coin is dug up at Arikamedu | Its markings name a ruler | That dates the site and its trade", "map"],
        ["Literary sources", "Written works record ideas and daily life, but always carry the writer's point of view.", "texts + inscriptions = literary source", "Read Sangam poetry | Note what it says about kings and trade | Cross-check with what was dug up", "stack"],
      ]],
      ["The universe and solar system", [
        ["Planets and their order", "Eight planets orbit the Sun, and their distance decides their year.", "Farther planet → longer year", "Start at the Sun | Count outward: Mercury, Venus, Earth, Mars | Earth takes 365 days for one orbit", "map"],
        ["Day and night", "The Earth spinning on its axis, not the Sun moving, is what gives us day and night.", "one rotation = 24 hours", "Earth turns on its axis | The side facing the Sun has day | The other side has night", "cycle"],
      ]],
      ["Diversity of India", [
        ["Unity in diversity", "Many languages, faiths and foods share one constitutional identity.", "different cultures, one citizenship", "List the languages in your class | Note what daily life still shares | That shared life is unity in diversity", "map"],
        ["Regional cultures", "Geography shapes what a region wears, eats, sings and farms.", "land and climate shape culture", "Compare a coastal district with a dry one | Look at what each farms | The crop shapes the festivals too", "map"],
      ]],
    ],
  },

  7: {
    tamil: [
      ["வேற்றுமை — case endings", [
        ["வேற்றுமை உருபுகள்", "Eight case endings change how a noun connects to the rest of the sentence.", "ஐ, ஆல், கு, இன், அது, கண்", "Take மரம் | Add the உருபு ஐ | மரத்தை is the second வேற்றுமை", "grid"],
        ["ஆறாம் வேற்றுமை", "The sixth case marks belonging, the way 'of' does in English.", "உருபு: அது / ஆது", "Take கண்ணன் | Add அது | கண்ணனது புத்தகம் means Kannan's book", "stack"],
      ]],
      ["ஆகுபெயர்", [
        ["இடவாகுபெயர்", "A place name is used to mean the people or things in that place.", "place → what is in it", "Say ஊர் கூடியது | An ஊர் cannot gather | The word stands for its people", "cycle"],
        ["பண்பாகுபெயர்", "A quality word is used to name the thing that carries the quality.", "quality → object", "Say கருப்பு வாங்கினேன் | கருப்பு is a colour | Here it names the black object itself", "stack"],
      ]],
      ["அணி இலக்கணம் — figures", [
        ["உவமை அணி", "Two unlike things are compared openly using a comparison word.", "உவமை உருபு: போல், அன்ன", "Read: நிலவு போல் முகம் | Note the word போல் | The open comparison makes it உவமை", "bar"],
        ["உருவக அணி", "The comparison word is dropped and the two things are treated as one.", "no உருபு — A is B", "Read: முகநிலவு | There is no போல் | The face is named as the moon itself", "bar"],
      ]],
    ],
    english: [
      ["Tenses in use", [
        ["Present continuous", "Use it for something happening right now or around now.", "am / is / are + verb‑ing", "Now: I write a letter | Add am and ‑ing | I am writing a letter", "bar"],
        ["Present perfect", "Use it when a past action still matters at this moment.", "have / has + past participle", "I finished my project yesterday | The result matters now | I have finished my project", "cycle"],
      ]],
      ["Articles and prepositions", [
        ["a, an and the", "Use a or an when the listener does not know which one yet, and the when they do.", "first mention a/an · after that the", "I saw a dog | The listener now knows which dog | The dog was chasing a cat", "stack"],
        ["Prepositions of place", "In, on and at narrow down a place from wide to exact.", "in a city · on a street · at a number", "She lives in Madurai | On Anna Street | At number 14", "bar"],
      ]],
      ["Comprehension skills", [
        ["Skimming and scanning", "Skim to learn what a passage is about, scan to find one fact fast.", "skim for gist · scan for detail", "Skim the passage in 30 seconds | Read the question | Scan only for the word it asks about", "cycle"],
        ["Answering in your own words", "Copying the line back rarely answers the question; rephrase it to show you understood.", "understand, then rewrite", "Find the line that answers it | Close the book | Write the idea in your own sentence", "stack"],
      ]],
    ],
    maths: [
      ["Integers", [
        ["Adding integers", "On the number line, a positive moves right and a negative moves left.", "(−a) + b = b − a", "Start at −3 | Move 5 steps right | You land on +2", "bar"],
        ["Multiplying integers", "Two signs the same give a positive, two signs different give a negative.", "(−) × (−) = (+)", "Take (−4) × (−3) | Both signs are negative | The answer is +12", "grid"],
      ]],
      ["Area and perimeter", [
        ["Area of a triangle", "A triangle is exactly half of the rectangle built on the same base and height.", "A = ½ × b × h", "Base 8 cm, height 5 cm | Multiply 8 × 5 = 40 | Half of 40 is 20 cm²", "grid"],
        ["Circumference of a circle", "The distance around a circle is a little over three times its width.", "C = 2πr", "Radius 7 cm | 2 × 22/7 × 7 | The circumference is 44 cm", "cycle"],
      ]],
      ["Algebraic expressions", [
        ["Like and unlike terms", "Only terms with the very same letters and powers can be added together.", "3x + 5x = 8x, but 3x + 5y stays as it is", "Take 3x + 5x + 2y | 3x and 5x are like terms | The answer is 8x + 2y", "stack"],
        ["Substituting a value", "Replace the letter with the number, then do the arithmetic in the usual order.", "value first, then operate", "Take 3x + 4 with x = 5 | 3 × 5 = 15 | 15 + 4 = 19", "bar"],
      ]],
    ],
    science: [
      ["Heat and temperature", [
        ["Heat versus temperature", "Heat is energy moving, temperature is how hot something is; they are not the same.", "heat in joules · temperature in °C", "A cup and a bucket both at 40 °C | The bucket holds far more water | So it holds more heat at the same temperature", "bar"],
        ["Conduction, convection, radiation", "Heat travels by touching, by moving fluid, or by rays that need no medium.", "solid · fluid · no medium", "Hold a metal spoon in hot rasam | Heat climbs the metal by conduction | The steam rising is convection", "cycle"],
      ]],
      ["Electricity", [
        ["Open and closed circuits", "Current only flows when the path from one terminal back to the other is unbroken.", "closed path → current flows", "Connect a cell, wire and bulb | Leave one end loose | The bulb stays off until the loop is closed", "cycle"],
        ["Series and parallel", "In series one break stops everything; in parallel each branch stands on its own.", "series: one path · parallel: many", "Wire two bulbs in series | Remove one bulb | Both go out, because the single path is broken", "grid"],
      ]],
      ["Nutrition in plants", [
        ["Photosynthesis", "Leaves build their own food using light, water and carbon dioxide.", "CO₂ + H₂O + light → glucose + O₂", "Water rises from the roots | The leaf takes in CO₂ and sunlight | Glucose is made and oxygen released", "cycle"],
        ["Other modes of nutrition", "Some plants trap insects or live off a host when their soil cannot supply enough.", "parasitic · insectivorous · saprophytic", "Cuscuta has no green leaves | It coils around a host plant | It draws ready-made food from it", "stack"],
      ]],
    ],
    social: [
      ["Medieval Tamil country", [
        ["Village administration", "Local assemblies ran land, water and temple affairs long before modern councils.", "sabha and ur managed the village", "Read an Uttiramerur inscription | It lists who may stand for the assembly | Local rules were written into stone", "map"],
        ["Temples as institutions", "A big temple was also a bank, a school and the largest employer in its town.", "temple = worship + economy", "Land is gifted to a temple | The temple hires workers and lends grain | The town's economy turns around it", "stack"],
      ]],
      ["Interior of the earth", [
        ["Layers of the earth", "Crust, mantle and core differ in what they are made of and how hot they are.", "crust · mantle · core", "Start at the surface crust | Go deeper into the mantle | The core is hottest and densest", "map"],
        ["Volcanoes", "Molten rock under pressure escapes wherever the crust is weakest.", "magma below → lava above", "Pressure builds in the magma chamber | It forces its way up a vent | Lava reaches the surface", "cycle"],
      ]],
      ["Government and democracy", [
        ["Levels of government", "Local, state and union governments each hold their own list of subjects.", "local · state · union", "A broken street light is local | School policy is mostly state | Defence is union", "map"],
        ["Why we vote", "A vote is how a citizen hands power to a representative for a fixed term.", "one person, one vote", "Voters choose a candidate | The one with most votes represents them | At the next election they answer for it", "cycle"],
      ]],
    ],
  },

  8: {
    tamil: [
      ["வினை — verbs in depth", [
        ["தன்வினை, பிறவினை", "A verb either acts on its own subject or makes someone else act.", "தன்வினை vs பிறவினை", "Read: கதவு திறந்தது | Now: அவன் கதவைத் திறந்தான் | The first is தன்வினை, the second பிறவினை", "stack"],
        ["வினையெச்சம்", "An incomplete verb form leans on the main verb that follows it.", "verb + எச்சம் → needs a main verb", "Read: படித்து முடித்தான் | படித்து cannot stand alone | முடித்தான் completes it", "cycle"],
      ]],
      ["அணி இலக்கணம்", [
        ["தற்குறிப்பேற்ற அணி", "The poet reads a human intention into something in nature.", "nature given a motive", "The poet says the cloud rushed to help | A cloud has no intention | That imagined motive is the அணி", "stack"],
        ["வேற்றுமை அணி", "Two things are called different in order to praise one of them.", "denial used as praise", "Say: this is not a face, it is the moon | The denial is deliberate | It works as praise", "bar"],
      ]],
      ["மரபுத் தொடர்கள்", [
        ["மரபுத் தொடர்", "Fixed Tamil phrases must be used as they are, not word by word.", "set phrase, fixed wording", "Say பூ மலர்ந்தது, not பூ பிறந்தது | Each thing has its own மரபு verb | Learn the pair together", "stack"],
        ["பழமொழி", "A proverb compresses a lesson into a line that stays memorable.", "short line, long meaning", "Read: ஆழம் அறியாமல் காலை விடாதே | The surface sense is about water | The lesson is about acting without knowing", "cycle"],
      ]],
    ],
    english: [
      ["Voice", [
        ["Active to passive", "Move the object to the front when the action matters more than the doer.", "object + be + past participle + by", "Active: Ravi wrote the letter | Move the letter to the front | The letter was written by Ravi", "bar"],
        ["When passive is right", "Passive fits when the doer is unknown, obvious or beside the point.", "use it for process and report writing", "The doer is unknown | Say: the shop was robbed | No 'by' phrase is needed", "stack"],
      ]],
      ["Reported speech", [
        ["Statements", "Shift the tense one step back and change the pronouns to match the new speaker.", "said that + one tense back", "He said, 'I am tired' | Shift am to was, I to he | He said that he was tired", "bar"],
        ["Questions", "A reported question keeps statement word order and drops the question mark.", "asked if / asked wh‑", "She asked, 'Where is Meena?' | Reorder to statement form | She asked where Meena was", "cycle"],
      ]],
      ["Formal letter writing", [
        ["Parts of a formal letter", "Sender, date, receiver, subject, salutation, body and closing each sit in a fixed place.", "fixed layout, fixed order", "Put your address at the top left | Add the date, then the receiver | Write a one-line subject before the salutation", "stack"],
        ["Tone and length", "Ask clearly in the first line, give the reason next, and stop.", "one request, three short paragraphs", "State what you want in line one | Give the reason in the next paragraph | Close with thanks and your name", "bar"],
      ]],
    ],
    maths: [
      ["Rational numbers", [
        ["Closure and commutativity", "Rational numbers stay rational when you add, subtract or multiply them.", "a/b + c/d = (ad + bc) / bd", "Take 2/3 and 1/4 | Make the denominators alike: 8/12 and 3/12 | Add to get 11/12, still rational", "bar"],
        ["Rational numbers between two numbers", "Between any two rational numbers there is always another one.", "mean = (a + b) / 2", "Take 1/2 and 3/4 | Add them: 5/4 | Halve it to get 5/8, which lies between", "bar"],
      ]],
      ["Algebraic identities", [
        ["(a + b)²", "Squaring a sum is not squaring each part; the middle term is the one people forget.", "(a + b)² = a² + 2ab + b²", "Take (x + 3)² | a² = x², b² = 9 | 2ab = 6x, so the answer is x² + 6x + 9", "grid"],
        ["a² − b²", "A difference of two squares always splits into two neat brackets.", "a² − b² = (a + b)(a − b)", "Take x² − 16 | Write 16 as 4² | So it factors as (x + 4)(x − 4)", "grid"],
      ]],
      ["Mensuration", [
        ["Area of a trapezium", "Average the two parallel sides, then multiply by the distance between them.", "A = ½ (a + b) h", "Parallel sides 10 cm and 6 cm, height 4 cm | Add: 10 + 6 = 16, half is 8 | 8 × 4 = 32 cm²", "grid"],
        ["Volume of a cuboid", "Volume counts how many unit cubes fit inside the box.", "V = l × b × h", "A box 5 × 3 × 2 cm | Multiply 5 × 3 = 15 | 15 × 2 = 30 cm³", "grid"],
      ]],
    ],
    science: [
      ["Light", [
        ["Laws of reflection", "The ray bounces at exactly the angle it arrived, measured from the normal.", "angle of incidence = angle of reflection", "A ray hits a mirror at 30° to the normal | Reflection obeys the law | It leaves at 30° on the other side", "bar"],
        ["Images in a plane mirror", "The image is as far behind the mirror as the object is in front, and laterally flipped.", "virtual, erect, same size", "Stand 2 m from a mirror | The image sits 2 m behind it | Your right hand appears as the left", "grid"],
      ]],
      ["Sound", [
        ["How sound travels", "Sound needs particles to pass the vibration along, so it cannot cross a vacuum.", "solids > liquids > gases", "A bell rings inside a jar | Pump the air out | The ringing fades because nothing carries it", "cycle"],
        ["Pitch and loudness", "Frequency decides how high a sound is, amplitude decides how loud.", "pitch ← frequency · loudness ← amplitude", "Tighten a string and pluck it | It vibrates faster | The pitch rises while loudness stays the same", "bar"],
      ]],
      ["Atomic structure", [
        ["Protons, neutrons, electrons", "The nucleus holds the mass, the electrons hold the volume.", "atomic number = number of protons", "Carbon has 6 protons | So its atomic number is 6 | A neutral carbon atom has 6 electrons too", "stack"],
        ["Valency", "Valency is how many electrons an atom must share or shift to fill its outer shell.", "outer shell wants 8", "Sodium has 1 outer electron | Losing it leaves a full shell | So sodium's valency is 1", "cycle"],
      ]],
    ],
    social: [
      ["Advent of the Europeans", [
        ["Why they came", "Spices, cloth and a sea route that avoided land tolls brought European traders to the coast.", "trade first, territory later", "Pepper is costly in Europe | A sea route cuts out the middlemen | Trading posts follow, then forts", "map"],
        ["From trade to rule", "Trading rights turned into revenue rights, and revenue rights into government.", "factory → fort → province", "The company wins trading rights | It fortifies its post | It then collects land revenue", "stack"],
      ]],
      ["Resources", [
        ["Renewable and non-renewable", "Some resources refill within a human lifetime; others do not.", "renewable vs non-renewable", "Compare sunlight and coal | Sunlight arrives daily | Coal took millions of years and will not return", "cycle"],
        ["Conservation", "Using less, reusing more and choosing renewables is what stretches a resource.", "reduce · reuse · recycle", "Note your daily water use | Find one step that wastes the most | Change that step first", "bar"],
      ]],
      ["The Indian Constitution", [
        ["Fundamental rights", "Six rights every citizen holds, which the state itself must respect.", "equality · freedom · against exploitation · religion · culture · remedies", "A citizen is denied entry to a public tank | That breaks the right to equality | The courts can be approached under the right to remedies", "stack"],
        ["Fundamental duties", "Rights come with duties that keep those rights workable for everyone.", "duties support rights", "You have a right to a clean environment | Keeping public places clean is the matching duty | Both sit in the same Constitution", "cycle"],
      ]],
    ],
  },

  9: {
    tamil: [
      ["தொகைநிலைத் தொடர்", [
        ["வேற்றுமைத் தொகை", "The case ending is hidden but understood inside the compound word.", "உருபு மறைந்து நிற்கும்", "Read: தலைவணங்கி | The ஐ உருபு is missing | Restore it: தலையை வணங்கி", "stack"],
        ["உவமைத் தொகை", "The comparison word is dropped and the comparison is folded into one word.", "உவமை உருபு மறைந்தது", "Read: மலர்க்கண் | Restore it: மலர் போன்ற கண் | The missing போன்ற marks it", "bar"],
      ]],
      ["அணி இலக்கணம்", [
        ["இயல்பு நவிற்சி அணி", "The poet states a thing plainly, with no exaggeration at all.", "plain, literal description", "Read a line that states only fact | Look for exaggeration and find none | That plainness is the அணி", "stack"],
        ["உயர்வு நவிற்சி அணி", "The poet exaggerates far past the possible to make a point.", "deliberate exaggeration", "Read: his fame crossed the seas | That cannot be literal | The exaggeration is the அணி", "bar"],
      ]],
      ["யாப்பிலக்கணம்", [
        ["அசை", "Syllable units are the smallest building blocks of a Tamil metre.", "நேரசை and நிரையசை", "Split the word into sound units | A long single unit is நேர் | A short followed by another is நிரை", "grid"],
        ["சீர்", "Groups of அசை form a சீர், and சீர் make up a line.", "அசை → சீர் → அடி", "Mark the அசை across the line | Group them in twos or threes | Each group is one சீர்", "stack"],
      ]],
    ],
    english: [
      ["Clauses", [
        ["Main and subordinate clauses", "A main clause stands alone; a subordinate clause depends on it.", "subordinate clause opens with if, when, because, that", "Read: I stayed home because it rained | I stayed home stands alone | because it rained cannot", "stack"],
        ["Relative clauses", "A relative clause adds information about a noun without starting a new sentence.", "who · which · that", "The boy won the prize. He sat next to me | Join them with who | The boy who sat next to me won the prize", "cycle"],
      ]],
      ["Figures of speech", [
        ["Simile and metaphor", "A simile compares openly with like or as; a metaphor states the comparison as fact.", "simile: like/as · metaphor: is", "As brave as a lion is a simile | Drop the as | He is a lion becomes a metaphor", "bar"],
        ["Personification", "Something not alive is given a human action or feeling.", "non-human + human action", "The wind whispered through the field | Wind cannot whisper | That human action is personification", "stack"],
      ]],
      ["Essay writing", [
        ["Structuring an essay", "One idea per paragraph, with the first sentence announcing it.", "intro · three body paragraphs · close", "List three points before writing | Give each its own paragraph | Open each paragraph with its point", "stack"],
        ["Writing a strong opening", "Start with a fact, a question or a scene, never with a dictionary definition.", "hook, then thesis", "Skip 'Water is a liquid' | Open with a specific fact instead | Then state what your essay argues", "bar"],
      ]],
    ],
    maths: [
      ["Set language", [
        ["Union and intersection", "Union collects everything, intersection keeps only what is shared.", "A ∪ B · A ∩ B", "A = {1,2,3}, B = {3,4} | Union gathers all: {1,2,3,4} | Intersection keeps only {3}", "grid"],
        ["De Morgan's laws", "The complement of a union is the intersection of the complements.", "(A ∪ B)′ = A′ ∩ B′", "Take (A ∪ B)′ | Complement each set | Swap the union for an intersection", "stack"],
      ]],
      ["Polynomials", [
        ["Degree of a polynomial", "The highest power present decides the degree, and the degree decides its shape.", "degree = highest exponent", "Take 4x³ + 2x − 7 | Find the highest power | The degree is 3", "bar"],
        ["Remainder theorem", "Dividing by (x − a) leaves exactly p(a) as the remainder.", "p(x) ÷ (x − a) leaves p(a)", "p(x) = x² + 3x + 2, divide by (x − 1) | Substitute x = 1 | p(1) = 6, so the remainder is 6", "grid"],
      ]],
      ["Coordinate geometry", [
        ["Distance between two points", "The distance formula is the Pythagoras theorem written for coordinates.", "d = √((x₂−x₁)² + (y₂−y₁)²)", "Points (1,2) and (4,6) | Differences are 3 and 4 | √(9 + 16) = 5 units", "grid"],
        ["Section formula", "A point dividing a line in a given ratio is a weighted average of the two ends.", "((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))", "Divide (2,3) and (6,7) in 1:1 | Average the x values: 4 | Average the y values: 5, giving (4,5)", "bar"],
      ]],
    ],
    science: [
      ["Motion", [
        ["Newton's first law", "An object keeps doing what it was doing until an outside force changes it.", "no net force → no change in motion", "A bus brakes suddenly | No force acted on you | You keep moving forward", "cycle"],
        ["Newton's second law", "Force is what changes momentum, and mass decides how much force it takes.", "F = ma", "Mass 5 kg, acceleration 2 m/s² | Multiply them | Force needed is 10 N", "bar"],
      ]],
      ["Atoms and molecules", [
        ["Mole concept", "A mole is just a counting word, like a dozen, but for 6.022 × 10²³ particles.", "1 mole = 6.022 × 10²³", "Take 2 moles of carbon | Multiply by 6.022 × 10²³ | That is 1.2044 × 10²⁴ atoms", "grid"],
        ["Law of conservation of mass", "Matter is rearranged in a reaction, never created or destroyed.", "mass of reactants = mass of products", "Burn 12 g of carbon in 32 g of oxygen | Nothing escapes the sealed vessel | You get 44 g of carbon dioxide", "cycle"],
      ]],
      ["Electric circuits", [
        ["Ohm's law", "Current through a conductor rises in step with the voltage across it.", "V = IR", "A 6 V cell across a 3 Ω resistor | Divide 6 by 3 | The current is 2 A", "bar"],
        ["Resistors in series and parallel", "Series adds resistance; parallel always lowers it below the smallest one.", "series R = R₁ + R₂ · parallel 1/R = 1/R₁ + 1/R₂", "Two 6 Ω resistors in parallel | 1/R = 1/6 + 1/6 = 1/3 | So R = 3 Ω", "grid"],
      ]],
    ],
    social: [
      ["Ancient civilisations", [
        ["Why rivers mattered", "Early cities grew where water, silt and transport met in one place.", "river → farming surplus → city", "Silt renews the soil each flood | Farmers grow more than they eat | The surplus supports crafts and cities", "map"],
        ["Writing and record keeping", "Writing began as accounting before it carried literature.", "records first, literature later", "Grain is stored for the city | Someone must track who gave what | Marks on clay become a script", "stack"],
      ]],
      ["Lithosphere", [
        ["Plate movement", "Slow-moving plates build mountains where they collide and trenches where they dive.", "convergent · divergent · transform", "Two plates push together | Neither can pass | The crust folds upward into mountains", "map"],
        ["Earthquakes", "Stress builds along a fault until the rock slips all at once.", "focus below · epicentre above", "Stress builds along a fault line | The rock finally slips | Waves spread out from the focus", "cycle"],
      ]],
      ["Elements of democracy", [
        ["Separation of powers", "Legislature, executive and judiciary are kept apart so none holds all the power.", "make · execute · interpret", "The legislature passes a law | The executive carries it out | The judiciary tests it against the Constitution", "stack"],
        ["Free and fair elections", "An election is fair only if the contest, the roll and the count are all open to check.", "equal vote, open count", "Every adult citizen is on the roll | Candidates contest on equal terms | Counting happens in the open", "cycle"],
      ]],
    ],
  },
};

// How much of each subject the app shows. The data is stored in the order SCERT
// prints it, so a limit of 5 would show chapters 1 to 5 of the real syllabus
// rather than a hand-picked set.
//
// Currently off, so Class 10 Maths shows all 8 chapters and Science all 23.
// Put the numbers back to 5 to return to the trimmed demo.
export const LIMITS = { chapters: Infinity, concepts: Infinity };

// What the full syllabus holds, recorded before the slice so the app can still
// say how much sits behind the demo.
const fullCounts = {};

function expand(source) {
  const out = {};
  Object.entries(source).forEach(([cls, subjects]) => {
    out[cls] = {};
    fullCounts[cls] = {};
    Object.entries(subjects).forEach(([subjectId, chapters]) => {
      fullCounts[cls][subjectId] = {
        chapters: chapters.length,
        concepts: chapters.reduce((n, [, list]) => n + list.length, 0),
      };
      out[cls][subjectId] = chapters.slice(0, LIMITS.chapters).map(([title, concepts], ci) => ({
        id: `${cls}-${subjectId}-${ci + 1}`,
        number: ci + 1,
        title,
        concepts: concepts.slice(0, LIMITS.concepts).map(([name, summary, formula, steps, av, video, extra], ni) => ({
          id: `${cls}-${subjectId}-${ci + 1}-${ni + 1}`,
          number: `${ci + 1}.${ni + 1}`,
          name,
          summary,
          formula,
          steps: steps.split(" | "),
          av,
          video: video ?? null,
          // Optional longer theory. Absent on most concepts, so every consumer
          // has to treat these as possibly null or empty.
          figures: extra?.figures ?? (extra?.figure ? [extra.figure] : []),
          images: extra?.images ?? [],
          deeper: extra?.deeper ?? null,
          mistake: extra?.mistake ?? null,
          tryIt: extra?.tryIt ?? null,
          // A full worked sum for the Steps tab: a question plus [line, note] rows
          // revealed one at a time. Falls back to `steps` where this is absent.
          work: extra?.work ?? null,
        })),
      }));
    });
  });
  return out;
}

export const curriculum = expand({ ...raw, ...seniorRaw, 10: class10Raw });

// Chapter and concept counts for the whole subject, ignoring the demo slice.
// Useful for a line such as "showing 5 of 23 chapters".
export function syllabusCounts(classId, subjectId) {
  return fullCounts[classId]?.[subjectId] ?? { chapters: 0, concepts: 0 };
}

export function getChapters(classId, subjectId) {
  return curriculum[classId]?.[subjectId] ?? [];
}

export function countConcepts(classId, subjectId) {
  return getChapters(classId, subjectId).reduce((n, ch) => n + ch.concepts.length, 0);
}

export const totals = {
  chapters: CLASSES.reduce(
    (n, c) => n + SUBJECTS.reduce((m, s) => m + getChapters(c.id, s.id).length, 0),
    0
  ),
  concepts: CLASSES.reduce(
    (n, c) => n + SUBJECTS.reduce((m, s) => m + countConcepts(c.id, s.id), 0),
    0
  ),
  classes: CLASSES.length,
};

// Counts for one class, across whichever subjects that class actually studies.
export function classTotals(classId) {
  const list = hasGroups(classId)
    ? GROUPS.flatMap((g) => g.subjects).filter((v, i, a) => a.indexOf(v) === i)
    : CORE_SUBJECTS;
  return {
    chapters: list.reduce((n, id) => n + getChapters(classId, id).length, 0),
    concepts: list.reduce((n, id) => n + countConcepts(classId, id), 0),
    subjects: list.length,
  };
}
