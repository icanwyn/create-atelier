const fs = require("fs");
const path = require("path");

const curated = [
  {
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    year: 1990,
    category: "Flow State",
    short: "The psychology of optimal experience and deep absorption.",
    essence:
      "Flow is where challenge meets skill—and the self dissolves into full attention.",
    paragraphs: [
      "Flow arises when challenges slightly exceed skills in a clear activity.",
      "Goals must be clear and feedback immediate for absorption to deepen.",
      "Concentration becomes so focused that irrelevant noise falls away.",
      "Self-consciousness disappears; action and awareness merge.",
      "Time distorts—hours feel like minutes inside the work.",
      "Autotelic experience: the activity is rewarding for its own sake.",
      "Flow is cultivable through structured attention, not luck.",
      "Too little challenge breeds boredom; too much breeds anxiety.",
      "Daily life can be redesigned to host more flow episodes.",
      "The good life is not passive leisure but the quality of experience.",
    ],
  },
  {
    title: "Creativity",
    author: "Mihaly Csikszentmihalyi",
    year: 1996,
    category: "Creative Process",
    short: "How creative people live, work, and transform domains.",
    essence:
      "Creativity is a system—person, domain, and field—not a lone spark of genius.",
    paragraphs: [
      "Creativity requires novelty that is valued by a field of experts.",
      "Domains provide rules; creators bend them after mastering them.",
      "Curiosity and perseverance outrank raw talent alone.",
      "Creative lives balance solitude with stimulating networks.",
      "Energy management and routines protect deep work time.",
      "Complexity of personality—both playful and disciplined—marks creators.",
      "Luck and preparation meet at the edge of a domain.",
      "Flow experiences fuel long creative careers.",
      "Mentors and gatekeepers shape which ideas survive.",
      "A creative life is a continuous conversation with a craft.",
    ],
  },
  {
    title: "The Artist's Way",
    author: "Julia Cameron",
    year: 1992,
    category: "Creative Recovery",
    short: "A twelve-week path to unblock and recover the creative self.",
    essence:
      "Creativity recovers through gentle daily practice—pages, dates, and permission.",
    paragraphs: [
      "Morning Pages clear psychic clutter before the day's demands.",
      "Artist Dates refill the well with non-productive delight.",
      "Creative blocks often mask fear, perfectionism, and old shame.",
      "Synchronicity increases when you show up consistently.",
      "Crazymakers and critics must be bounded, not obeyed.",
      "Success can frighten artists as much as failure.",
      "Abundance thinking replaces scarcity around time and ideas.",
      "Spirituality here means connection, not dogma.",
      "Recovering artists reparent their creative child.",
      "The path is incremental: small, kind, daily acts compound.",
    ],
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2015,
    category: "Creative Courage",
    short: "Creative living beyond fear, ego, and the need for permission.",
    essence:
      "Ideas are curious visitors—meet them with courage, curiosity, and low drama.",
    paragraphs: [
      "Fear is allowed in the car but never allowed to drive.",
      "Curiosity is a kinder compass than passion alone.",
      "Ideas move on if you refuse to collaborate with them.",
      "Perfectionism is fear wearing a fancy coat.",
      "You do not need permission or a perfect plan to begin.",
      "Entitlement and martyrdom both poison creative joy.",
      "Done is better than endlessly improved in secret.",
      "Creativity can be a life path without being a career crisis.",
      "Trickster energy lightens the heaviness of serious art.",
      "Make things because you are a living human, not a brand.",
    ],
  },
  {
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    year: 2012,
    category: "Creative Practice",
    short: "Nothing is original—remix influences into your own voice.",
    essence:
      "Start copying what you love; the transformation into you is inevitable.",
    paragraphs: [
      "All creative work builds on a lineage of influences.",
      "Steal the thinking, not the surface style alone.",
      "Write the book you want to read; make what you want to see.",
      "Use your hands—analog mess unlocks digital clarity.",
      "Side projects and hobbies feed the main work.",
      "Do good work and share it for the right people to find.",
      "Geography matters less than the scene you build.",
      "Be boring in lifestyle so you can be wild in work.",
      "Creativity is subtraction as much as addition.",
      "Leave breadcrumbs of process so others can learn from you.",
    ],
  },
  {
    title: "Show Your Work",
    author: "Austin Kleon",
    year: 2014,
    category: "Creative Practice",
    short: "Share process, find your people, and build an audience generously.",
    essence:
      "Share your process, not just polished products—generosity is a creative strategy.",
    paragraphs: [
      "You do not have to be a genius to be open.",
      "Share fragments, drafts, and lessons—not only launches.",
      "Tell good stories about how the work is made.",
      "Teach what you know; teaching clarifies skill.",
      "Online presence is a landscape you tend, not a megaphone.",
      "Turn fans into patrons carefully and gratefully.",
      "Work does not speak for itself; context helps it travel.",
      "Keep a daily dispatch of small shares.",
      "Avoid hot takes; prefer useful, durable notes.",
      "Build a sustainable rhythm of making and sharing.",
    ],
  },
  {
    title: "Keep Going",
    author: "Austin Kleon",
    year: 2019,
    category: "Creative Practice",
    short: "Ten ways to stay creative in good times and bad.",
    essence:
      "Creativity is a lifelong practice of attention, routine, and not quitting.",
    paragraphs: [
      "Every day is groundhog day—build a bliss station.",
      "Build a bliss station where focus is protected.",
      "Forget the noun; do the verb—writer writes.",
      "Make gifts; lower the stakes of self-expression.",
      "The ordinary plus extra attention becomes extraordinary.",
      "Slash your timeline of influence; study deeper.",
      "Travel far and dig deep in your own attention.",
      "Spend time on something that will outlast you.",
      "When in doubt, tidy up your space and tools.",
      "Keep going is the whole method.",
    ],
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    year: 2002,
    category: "Creative Courage",
    short: "Resistance is the enemy; turn pro and do the work.",
    essence: "Resistance will invent any excuse—professionals show up anyway.",
    paragraphs: [
      "Resistance is the invisible force opposing creative acts.",
      "It intensifies near the work that matters most.",
      "Fear is a compass pointing to true north work.",
      "Professionals have routines; amateurs wait for mood.",
      "Playing for the work's sake beats playing for status.",
      "Territory over hierarchy: love the practice ground.",
      "Muses reward those who sit down on schedule.",
      "Criticism from non-doers is discounted.",
      "Finishing is a muscle Resistance hates.",
      "The more important the calling, the stronger the Resistance.",
    ],
  },
  {
    title: "Do the Work",
    author: "Steven Pressfield",
    year: 2011,
    category: "Creative Courage",
    short: "A field manual for starting and finishing creative projects.",
    essence: "Begin before you're ready; structure beats inspiration for finishing.",
    paragraphs: [
      "Start before you feel prepared.",
      "Research can become sophisticated procrastination.",
      "Act from instinct, then refine.",
      "Three-act structure helps any project move.",
      "Expect the belly of the beast mid-project.",
      "Allies and mentors shorten the dark middle.",
      "Stay stupid: don't overcomplicate early drafts.",
      "Ship on a date; shipping trains courage.",
      "Failure is data for the next round.",
      "The work teaches you how to do the work.",
    ],
  },
  {
    title: "Turning Pro",
    author: "Steven Pressfield",
    year: 2012,
    category: "Creative Courage",
    short: "The difference between amateur identity and professional practice.",
    essence: "Turning pro is an identity shift expressed as daily behavior.",
    paragraphs: [
      "The amateur is addicted to the dream, not the craft.",
      "Pros have a schedule and defend it.",
      "Shadow careers mimic the calling without the risk.",
      "Addiction and distraction are Resistance's cousins.",
      "The pro self-validates through practice, not applause.",
      "Rituals open the door to deeper work.",
      "Pros accept loneliness as part of the territory.",
      "Courage is chosen repeatedly, not once.",
      "Mastery is love of the craft over the trophy.",
      "You are two selves; the pro leads.",
    ],
  },
];

const more = [
  ["Bird by Bird", "Anne Lamott", 1994, "Writing Craft", "Short assignments, shitty first drafts, and merciful process.", "Writing advances one bird at a time—permission over perfection."],
  ["On Writing", "Stephen King", 2000, "Writing Craft", "A memoir of craft: toolbox, reading, and the writing life.", "Write a lot, read a lot, and kill your darlings with honesty."],
  ["The Creative Habit", "Twyla Tharp", 2003, "Creative Practice", "Rituals and exercises from a master choreographer.", "Creativity is a habit of preparation, not a lightning strike."],
  ["The Creative Act", "Rick Rubin", 2023, "Creative Process", "A spiritual-practical guide to making art in any medium.", "Awareness is the source; the artist reduces interference."],
  ["Free Play", "Stephen Nachmanovitch", 1990, "Improvisation", "Improvisation in life and art as pure creative source.", "Play is practice for presence—structure emerges from listening."],
  ["Impro", "Keith Johnstone", 1979, "Improvisation", "Status, spontaneity, and the games that free imagination.", "Spontaneity returns when we stop trying to be interesting."],
  ["Lateral Thinking", "Edward de Bono", 1970, "Creative Thinking", "Deliberate methods to escape vertical logic traps.", "You can train sideways moves that logic alone will never find."],
  ["Six Thinking Hats", "Edward de Bono", 1985, "Creative Thinking", "Parallel thinking roles for clearer group creativity.", "Separate ego from idea by changing the hat, not the person."],
  ["A Technique for Producing Ideas", "James Webb Young", 1965, "Creative Process", "The classic five-step cycle of idea production.", "Ideas are new combinations born after prepared incubation."],
  ["Originals", "Adam Grant", 2016, "Innovation", "How non-conformists move the world without being reckless.", "Originals procrastinate strategically and manage risk with allies."],
  ["Creative Confidence", "Tom Kelley & David Kelley", 2013, "Design Thinking", "From fear of judgment to human-centered making.", "Creativity is a muscle rebuilt by small, successful experiments."],
  ["Change by Design", "Tim Brown", 2009, "Design Thinking", "Design thinking for innovation in organizations.", "Empathy, ideation, and prototype loops beat endless planning."],
  ["The Design of Everyday Things", "Don Norman", 1988, "Design Thinking", "Usability psychology for creators of products and experiences.", "Good design makes the right action visible and natural."],
  ["Sprint", "Jake Knapp", 2016, "Design Thinking", "Five-day process to solve big problems and test ideas.", "Timeboxed prototypes reveal truth faster than debate."],
  ["Make Time", "Jake Knapp & John Zeratsky", 2018, "Focus & Attention", "Design your day for focus, energy, and creative priority.", "Highlight one thing daily; defend it from the busy default."],
  ["Deep Work", "Cal Newport", 2016, "Focus & Attention", "Focused success in a distracted world.", "Hard focus is rare and valuable—schedule it like a meeting."],
  ["Slow Productivity", "Cal Newport", 2024, "Focus & Attention", "Sustainable accomplishment without burnout theater.", "Do fewer things better over longer horizons."],
  ["Digital Minimalism", "Cal Newport", 2019, "Focus & Attention", "A philosophy of intentional technology use.", "Remove low-value noise so attention can deepen."],
  ["Rest", "Alex Soojung-Kim Pang", 2016, "Flow State", "Deliberate rest as a partner to creative labor.", "Rest is a skill that multiplies insight, not a reward after collapse."],
  ["Peak", "Anders Ericsson & Robert Pool", 2016, "Mastery", "Deliberate practice and the science of expertise.", "Experts are built by designed practice at the edge of ability."],
  ["Talent Is Overrated", "Geoff Colvin", 2008, "Mastery", "Why deliberate practice beats innate genius myths.", "Greatness is engineered through painful, purposeful reps."],
  ["The Art of Learning", "Josh Waitzkin", 2007, "Mastery", "From chess to martial arts: learning principles for flow.", "Numbers to leave numbers—internalize form until presence leads."],
  ["Mindset", "Carol S. Dweck", 2006, "Creative Courage", "Growth vs fixed mindset in learning and creativity.", "Ability grows with effort; judgment freezes it."],
  ["Grit", "Angela Duckworth", 2016, "Mastery", "Passion and perseverance for long-term goals.", "Consistency of interest plus endurance outruns intensity alone."],
  ["Atomic Habits", "James Clear", 2018, "Creative Practice", "Tiny changes that compound into identity and results.", "Systems of small habits shape the artist you become."],
  ["Range", "David Epstein", 2019, "Creative Thinking", "Generalists, late specialization, and creative problem solving.", "Breadth fuels innovation when problems are wicked."],
  ["Where Good Ideas Come From", "Steven Johnson", 2010, "Innovation", "The natural history of innovation and liquid networks.", "Ideas are networks; connect hunches slowly in open environments."],
  ["How to Fly a Horse", "Kevin Ashton", 2015, "Innovation", "The secret history of creation and the myth of the moment.", "Creation is work—steps, edits, and persistence—not magic bolts."],
  ["Creativity, Inc.", "Ed Catmull", 2014, "Creative Leadership", "Pixar's management of talent, candor, and unfinished stories.", "Protect the new; build cultures where truth can be spoken early."],
  ["Orbiting the Giant Hairball", "Gordon MacKenzie", 1996, "Creative Leadership", "Surviving corporate systems while staying creative.", "Orbit bureaucracy close enough to matter, far enough to invent."],
  ["The Practice", "Seth Godin", 2020, "Creative Practice", "Shipping creative work as a generous daily practice.", "Trust the process of making and shipping without guarantees."],
  ["Linchpin", "Seth Godin", 2010, "Creative Courage", "Become indispensable by bringing emotional labor and art.", "Art is the personal gift of connection beyond the map."],
  ["The Icarus Deception", "Seth Godin", 2012, "Creative Courage", "Fly closer to the sun—make art in the connection economy.", "Safety is the risky choice when art is what is needed."],
  ["Ignore Everybody", "Hugh MacLeod", 2009, "Creative Courage", "Cards, cartoons, and advice on doing good creative work.", "Good ideas have lonely childhoods; keep drawing anyway."],
  ["Art & Fear", "David Bayles & Ted Orland", 1993, "Creative Courage", "Observations on the perils of artmaking and continuing.", "The work only gets made by those who risk imperfect work."],
  ["Letters to a Young Poet", "Rainer Maria Rilke", 1929, "Creative Spirit", "Letters on solitude, patience, and living the questions.", "Live the questions now; love the difficulty of becoming."],
  ["The Writing Life", "Annie Dillard", 1989, "Writing Craft", "Essays on the solitude and ferocity of writing.", "Write as if you are dying—attention is the only currency."],
  ["Several Short Sentences About Writing", "Verlyn Klinkenborg", 2012, "Writing Craft", "Sentence-level awareness as the root of clear prose.", "Think one sentence at a time until authority returns."],
  ["Draft No. 4", "John McPhee", 2017, "Writing Craft", "Structure, revision, and the long game of nonfiction.", "Structure is a creative act equal to the sentences."],
  ["Story", "Robert McKee", 1997, "Story & Myth", "Principles of screenwriting and story design.", "Story is life with pattern; conflict is the crucible of meaning."],
  ["The Hero with a Thousand Faces", "Joseph Campbell", 1949, "Story & Myth", "The monomyth shared across cultures.", "Myths map the journey every maker takes through ordeal to return."],
  ["The Writer's Journey", "Christopher Vogler", 1992, "Story & Myth", "Campbell's monomyth applied to modern storytelling.", "Map your project as a hero's journey to find missing stakes."],
  ["Understanding Comics", "Scott McCloud", 1993, "Visual Thinking", "The invisible art of comics and sequential imagination.", "Closure in the gaps is where the audience co-creates."],
  ["Making Comics", "Scott McCloud", 2006, "Visual Thinking", "Practical choices for clarity, expression, and storytelling.", "Every panel is a decision about time, emotion, and focus."],
  ["Drawing on the Right Side of the Brain", "Betty Edwards", 1979, "Visual Thinking", "See edges and relationships to unlock drawing skill.", "Drawing is seeing; skill follows attention training."],
  ["Ways of Seeing", "John Berger", 1972, "Visual Thinking", "How images, ownership, and culture shape perception.", "Seeing is ideological; artists can reframe what is visible."],
  ["The Timeless Way of Building", "Christopher Alexander", 1979, "Creative Process", "A living pattern language for places that feel alive.", "Quality without a name emerges from patterns that fit life."],
  ["A Pattern Language", "Christopher Alexander", 1977, "Creative Process", "Patterns for towns, buildings, and constructive creativity.", "Reusable patterns free creators to compose living wholes."],
  ["Zen Mind, Beginner's Mind", "Shunryu Suzuki", 1970, "Flow State", "Beginner's mind as the gateway to fresh practice.", "In the beginner's mind there are many possibilities."],
  ["The Inner Game of Tennis", "W. Timothy Gallwey", 1974, "Flow State", "Self 1 vs Self 2 and performance without overtrying.", "Quiet the judging self so natural skill can play."],
  ["Effortless Mastery", "Kenny Werner", 1996, "Flow State", "Music, meditation, and releasing fear to play freely.", "Mastery is fearless presence inside the instrument of self."],
  ["Presence", "Patsy Rodenburg", 2007, "Flow State", "The three circles of energy for authentic presence.", "Second circle energy connects without collapsing or pushing."],
  ["When", "Daniel H. Pink", 2018, "Focus & Attention", "The scientific secrets of perfect timing for creative work.", "Align deep work with your chronotype's peak."],
  ["Drive", "Daniel H. Pink", 2009, "Motivation", "Autonomy, mastery, and purpose as creative fuel.", "Intrinsic motives outperform carrot-and-stick for creative work."],
  ["A Whole New Mind", "Daniel H. Pink", 2005, "Creative Thinking", "Right-brain aptitudes for the conceptual age.", "Design, story, symphony, empathy, play, and meaning win."],
  ["The Element", "Ken Robinson", 2009, "Creative Spirit", "Finding the intersection of talent and passion.", "When aptitude meets passion, engagement becomes natural."],
  ["Out of Our Minds", "Ken Robinson", 2001, "Creative Spirit", "Why schools kill creativity—and how to restore it.", "Creativity is as important as literacy and can be taught."],
  ["Wired to Create", "Scott Barry Kaufman & Carolyn Gregoire", 2015, "Creative Process", "The messy minds of the most creative people.", "Creative minds tolerate chaos, solitude, and sensitive awareness."],
  ["The Rise", "Sarah Lewis", 2014, "Creative Courage", "Failure, grit, and the drive to convert limits into art.", "Near wins and unfinishedness propel creative ascent."],
  ["Daily Rituals", "Mason Currey", 2013, "Creative Practice", "How great minds structure their days.", "Rituals are architecture for unreliable inspiration."],
  ["Daily Rituals: Women at Work", "Mason Currey", 2019, "Creative Practice", "Routines of women creators across fields.", "Constraints of life force inventive structures for making."],
  ["The Wisdom of Insecurity", "Alan Watts", 1951, "Flow State", "Presence beyond the anxious pursuit of security.", "Creativity lives in the present you usually abandon."],
  ["Concerning the Spiritual in Art", "Wassily Kandinsky", 1911, "Creative Spirit", "Inner necessity as the law of artistic form.", "Form follows inner necessity, not fashion."],
  ["Art as Experience", "John Dewey", 1934, "Creative Process", "Aesthetic experience as continuous with everyday life.", "Art is refined experience, not a remote museum object."],
  ["Thinkertoys", "Michael Michalko", 1991, "Creative Thinking", "A handbook of creative-thinking techniques.", "Techniques force the mind off default rails."],
  ["Conceptual Blockbusting", "James L. Adams", 1974, "Creative Thinking", "Identifying and breaking mental blocks to problem solving.", "Name the block and you begin to dissolve it."],
  ["The Medici Effect", "Frans Johansson", 2004, "Innovation", "Intersection of fields as a source of breakthroughs.", "Innovation explodes where disciplines collide."],
  ["The Lean Startup", "Eric Ries", 2011, "Innovation", "Build-measure-learn for creative ventures under uncertainty.", "Validated learning is the unit of creative progress in startups."],
  ["Made to Stick", "Chip Heath & Dan Heath", 2007, "Innovation", "Why some ideas survive and others die.", "Simple, unexpected, concrete, credible, emotional stories stick."],
  ["Contagious", "Jonah Berger", 2013, "Innovation", "Why things catch on—and how creators can share better.", "Social currency and emotion make ideas travel."],
  ["Quiet", "Susan Cain", 2012, "Creative Spirit", "Introverts' power in a world that can't stop talking.", "Solitude is a creative advantage, not a defect."],
  ["The Courage to Create", "Rollo May", 1975, "Creative Courage", "Existential courage as the heart of creative acts.", "To create is to encounter nonbeing and continue."],
  ["If You Want to Write", "Brenda Ueland", 1938, "Writing Craft", "Permission, honesty, and the dignity of creative impulse.", "Everyone is talented if they tell the truth of their seeing."],
  ["Writing Down the Bones", "Natalie Goldberg", 1986, "Writing Craft", "Zen practice meets timed writing sprints.", "Keep the hand moving; first thoughts hold heat."],
  ["Save the Cat", "Blake Snyder", 2005, "Story & Myth", "Beat sheets that help stories move and sell.", "Structure liberates emotion by giving it a spine."],
  ["The Anatomy of Story", "John Truby", 2007, "Story & Myth", "22 steps and moral argument in storytelling.", "Premise is a moral argument expressed through character change."],
  ["The Collaborative Habit", "Twyla Tharp", 2009, "Creative Leadership", "How to work with others without losing the work.", "Collaboration is a practiced craft of clarity and generosity."],
  ["The Messy Middle", "Scott Belsky", 2018, "Creative Leadership", "Enduring the long middle of building products and teams.", "Endurance through ambiguity is a creative skill."],
  ["Making Ideas Happen", "Scott Belsky", 2010, "Creative Practice", "From idea to execution with organization and community.", "Ideas are worthless without a bias toward action systems."],
  ["The Accidental Creative", "Todd Henry", 2011, "Creative Practice", "Managing teams and selves for consistent brilliant work.", "Protect focus, relationships, energy, stimuli, and hours."],
  ["Die Empty", "Todd Henry", 2013, "Creative Courage", "Don't leave your best work unmade inside you.", "Urgency without panic: ship the work that matters."],
  ["Herding Tigers", "Todd Henry", 2018, "Creative Leadership", "Managing creative people without killing the magic.", "Leaders of creatives coach clarity and defend focus."],
  ["The Creative Curve", "Allen Gannett", 2018, "Innovation", "Familiar novelty and the science of breakout hits.", "Hits live on the curve between novel and recognizable."],
  ["Hit Makers", "Derek Thompson", 2017, "Innovation", "The science of popularity in culture and products.", "Distribution and mild surprise shape what becomes beloved."],
  ["Designing Your Life", "Bill Burnett & Dave Evans", 2016, "Creative Practice", "Design-thinking applied to careers and creative paths.", "Prototype your life; don't wait for one perfect plan."],
  ["inGenius", "Tina Seelig", 2012, "Creative Thinking", "A crash course on creativity from Stanford.", "Imagination × knowledge × attitude = creative engine."],
  ["The Obstacle Is the Way", "Ryan Holiday", 2014, "Creative Courage", "Stoic resilience for makers facing blocks and setbacks.", "What blocks the path becomes material for the work."],
  ["Stillness Is the Key", "Ryan Holiday", 2019, "Flow State", "Slowing down to think, create, and lead clearly.", "Stillness is the precondition for original signal."],
  ["Stolen Focus", "Johann Hari", 2022, "Focus & Attention", "Why we can't pay attention—and how to reclaim depth.", "Depth is a collective and personal design problem."],
  ["How to Do Nothing", "Jenny Odell", 2019, "Focus & Attention", "Resisting the attention economy through presence.", "Refusal and bioregional attention restore creative ground."],
  ["The Craftsman", "Richard Sennett", 2008, "Mastery", "Craft as the desire to do a job well for its own sake.", "Skill is ethical: good work forms good judgment."],
  ["Shop Class as Soulcraft", "Matthew B. Crawford", 2009, "Mastery", "Manual competence and the cognitive life of making.", "Hands-on work returns agency and clear feedback."],
  ["Wabi-Sabi for Artists", "Leonard Koren", 1994, "Creative Spirit", "Impermanence and incompleteness as aesthetic ground.", "Beauty includes the worn, the humble, and the incomplete."],
  ["The Art of Noticing", "Rob Walker", 2019, "Focus & Attention", "143 ways to wake up to the world and spark ideas.", "Noticing is a trainable creative skill."],
  ["Find Your Artistic Voice", "Lisa Congdon", 2019, "Creative Practice", "Developing style through volume and experimentation.", "Voice arrives after many imperfect attempts."],
  ["Creative Quest", "Questlove", 2018, "Creative Process", "A musician's map of curiosity and collaboration.", "Creativity thrives on omnivorous listening."],
  ["How Music Works", "David Byrne", 2012, "Creative Process", "Context shapes creation as much as genius.", "Scenes and rooms write the music with you."],
  ["Mastery", "Robert Greene", 2012, "Mastery", "Apprenticeship, creative-active, and mastery phases.", "Submit to a domain long enough to transform it."],
  ["The Practicing Mind", "Thomas M. Sterner", 2006, "Mastery", "Process focus for skill and calm.", "Stay in the process; results follow quietly."],
  ["So Good They Can't Ignore You", "Cal Newport", 2012, "Mastery", "Career capital over passion-first myths.", "Rare skills buy autonomy for creative life."],
  ["The Crossroads of Should and Must", "Elle Luna", 2015, "Creative Courage", "Choosing the must of vocation over the should of approval.", "Must is the work only you can do."],
  ["Ultralearning", "Scott H. Young", 2019, "Mastery", "Aggressive self-directed learning projects.", "Design learning projects as creative campaigns."],
  ["The First 20 Hours", "Josh Kaufman", 2013, "Mastery", "Rapid skill acquisition for creative hobbies.", "Smart practice design beats endless passive study."],
  ["Make It Stick", "Brown, Roediger & McDaniel", 2014, "Mastery", "Evidence-based learning that supports craft mastery.", "Desirable difficulties build durable skill."],
  ["The Attention Merchants", "Tim Wu", 2016, "Focus & Attention", "History of capturing minds—and reclaiming them.", "Know the attention economy to protect your creative hours."],
  ["Why We Make Things and Why It Matters", "Peter Korn", 2013, "Creative Spirit", "A furniture maker's philosophy of creative fulfillment.", "Making integrates head, hand, and hope."],
];

const spines = [
  "#6C63FF", "#FF6B6B", "#FF8E53", "#2EC4B6", "#E63946", "#9B5DE5", "#00BBF9",
  "#F15BB5", "#7B2CBF", "#F72585", "#4CC9F0", "#FF9F1C", "#2A9D8F", "#E76F51",
  "#8338EC", "#3A86FF", "#FB5607", "#FF006E", "#06D6A0", "#118AB2",
];
const accents = ["#FEE440", "#FF6B6B", "#00F5D4", "#F15BB5", "#FFD166", "#A0E8AF", "#FF9F1C"];
const images = [
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
  "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80",
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
  "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=800&q=80",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
];

function makeParas(title, category) {
  return [
    `${title} reframes how creators approach ${category.toLowerCase()} in daily practice.`,
    "A core claim is that process outranks mood when meaningful work is at stake.",
    "Attention is treated as the scarce resource of any creative life.",
    "Fear and ego appear as predictable obstacles rather than personal defects.",
    "Practice structures—rituals, constraints, feedback—make talent usable.",
    "Play and rigor are shown as partners, not opposites.",
    "Community, mentors, or audiences shape which ideas mature.",
    "Revision and iteration are where originality actually appears.",
    "Rest, body, and environment are part of the creative system.",
    "The lasting invitation: design a life that can host repeated flow.",
  ];
}

function appsFor(title, category) {
  return [
    {
      title: "Protect a daily create block",
      body: `From ${title}: schedule 45–90 minutes for undistracted making before inbox. Treat it like a rehearsal you do not cancel. Creativity needs a recurring appointment with your attention—especially around ${category.toLowerCase()}.`,
    },
    {
      title: "Lower the stakes to raise the volume",
      body: `Do a rough first version of today's task for 20 minutes. Quantity of attempts beats polished avoidance. ${title} rewards motion over waiting for perfect conditions.`,
    },
    {
      title: "Design one playful constraint",
      body: `Pick a limit (one color, 100 words, three chords, a 24-hour prototype). Constraints often unlock freer work than total freedom—use one this week and notice what opens.`,
    },
  ];
}

const full = [];
let n = 0;

for (const b of curated) {
  n += 1;
  full.push({
    id: n,
    title: b.title,
    author: b.author,
    year: b.year,
    category: b.category,
    short: b.short,
    essence: b.essence,
    image: images[n % images.length],
    spine: spines[n % spines.length],
    accent: accents[n % accents.length],
    paragraphs: b.paragraphs,
    applications: appsFor(b.title, b.category),
  });
}

for (const row of more) {
  if (full.length >= 100) break;
  const [title, author, year, category, short, essence] = row;
  n += 1;
  full.push({
    id: n,
    title,
    author,
    year,
    category,
    short,
    essence,
    image: images[n % images.length],
    spine: spines[n % spines.length],
    accent: accents[n % accents.length],
    paragraphs: makeParas(title, category),
    applications: appsFor(title, category),
  });
}

full.forEach((b, i) => {
  b.id = i + 1;
});

const outPath = path.join(__dirname, "..", "js", "books.js");
const js =
  "/** Create — Top 100 books on creativity, flow, and making */\n" +
  "window.CREATE_BOOKS = " +
  JSON.stringify(full) +
  ";\n" +
  "window.WEALTH_BOOKS = window.CREATE_BOOKS;\n";

fs.writeFileSync(outPath, js);
console.log("Wrote", full.length, "books to", outPath);
console.log(
  "Categories:",
  [...new Set(full.map((b) => b.category))].sort().join(", ")
);
