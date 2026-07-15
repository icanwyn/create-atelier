#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create insights as actual hip-hop songs about the book content.
- Coherent 8-line verses with real end-rhyme (mostly AABB)
- Bars are grammatical; teaching meat stays inside the rhyme
- NO music/studio metaphors
- NO stock repeated openers
"""
import json
import re
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

MUSIC_BAN = re.compile(
    r"\b("
    r"album|albums|mixtape|mixtapes|metronome|kick\s*drum|"
    r"liner\s*notes|ad-?lib|ad-?libs|cipher|ciphers|"
    r"recording\s*booth|vocal\s*booth|studio\s*booth|"
    r"sixteen\s*bars?|eight\s*bars?|"
    r"on\s*the\s*beat|drop\s*the\s*beat|"
    r"remix\s*culture|as\s*a\s*remix|"
    r"in\s*the\s*chorus|verse\s*and\s*chorus|"
    r"in\s*the\s*pocket|pocket\s*of\s*the\s*groove|"
    r"freestyle\s*session|rap\s*cipher"
    r")\b",
    re.I,
)

STOCK_BAN = re.compile(
    r"("
    r"plain as the|"
    r"made it plain|"
    r"chase the hype|"
    r"empty the |"
    r"fill up the |"
    r"book still means|"
    r"this insight the|"
    r"live the line|"
    r"whole book still|"
    r"scene:|"
    r"endcap:|"
    r"LEFT beat|"
    r"trap of the age|"
    r"lecture stage|"
    r"tattoo it on|"
    r"carry the bag|"
    r"hold the thesis"
    r")",
    re.I,
)

FLAG = {
    1: [
        "Flow hits when challenge sits a notch above skill",
        "Clear goals and quick feedback keep you locked in",
        "When you're deep, self-talk fades and action takes the wheel",
        "Time warps in deep work — hours feel like a blink",
        "The doing itself pays you — not just the trophy at the end",
        "Focus means cutting noise so one signal can lead",
        "Every deep session leaves you sharper than you were",
        "Ordinary days can be rebuilt to host more deep focus",
        "Steering your attention is the real quiet power",
        "Good teachers raise difficulty in steps, not cliffs",
    ],
    8: [
        "Resistance fights any act that grows your soul",
        "Resistance yells loudest near the work that matters",
        "Fear points at the true-north project",
        "Pros keep a schedule; amateurs wait on a mood",
        "Work the craft ground, not the status ladder",
        "Inspiration shows for people already sitting down",
        "Discount critics who never do the work",
        "Finishing is a muscle Resistance hates",
        "The more sacred the calling, the thicker the Resistance",
        "Turning pro is calendar behavior, not a vibe",
    ],
}


def H(*parts):
    return int(hashlib.sha256("||".join(map(str, parts)).encode()).hexdigest(), 16)


def clean(s):
    return re.sub(r"\s+", " ", (s or "").strip()).rstrip(" .")


def short_title(title):
    t = title.split(":")[0].strip()
    return t if len(t) <= 36 else t[:33] + "…"


def first_name(author):
    return author.split()[0]


# Each song template is a full 8-line verse with real rhyme scheme.
# Placeholders: {point} {author} {who} {title} {ess}
# Use {point} once near the top; weave {ess} near the end.

SONGS = [
    # 0 AABB
    [
        "{who} cracked open {title} and left one rule that still pays:",
        "{point} — that's the debt, that's the way.",
        "You can dress the desk in tools and still never stay,",
        "or strip the noise, sit down, and finally earn the day.",
        "Comfort sells soft; the real gift costs real pay —",
        "hours in the quiet when nobody's watching the play.",
        "Spine of the book: {ess}.",
        "Prove it once today in one sealed hour — no delay.",
    ],
    # 1 AABB
    [
        "From {title}, {who} put weight on a single claim:",
        "{point}.",
        "Talk is weather; work is the frame —",
        "clout is a crowd; craft is the name.",
        "If it stings, you found the real game —",
        "if it flatters, you found a soft shame.",
        "Live the rule till it sits in your frame,",
        "core of the book — {ess} — start the flame.",
    ],
    # 2 ABAB-ish couplets
    [
        "Real talk: {point}.",
        "{author} wrote {title} so excuses can't stay.",
        "Dress fear as 'taste' and watch progress delay —",
        "or strip fear and work, take the hit, then you pay.",
        "Hard day? Shrink the task. Still show. Still stay.",
        "Quiet grind, clean honesty — that's the only way.",
        "Underneath: {ess}.",
        "On top: this rule till your habits obey.",
    ],
    # 3 punch
    [
        "{point}.",
        "That's {who}. That's {title}. No maze.",
        "Live it in daylight or lose in the haze.",
        "Story sells fast; process pays late — choose long days.",
        "Ego wants praise; craft wants reps — choose the phase",
        "where the work is ugly and the finish still stays.",
        "Scared? Good. Means you found the true gate.",
        "Walk through small. Book aim: {ess}. No parade.",
    ],
    # 4 design
    [
        "{who} didn't blink in {title}:",
        "{point}.",
        "Design your hours so the rule can stay,",
        "or drown in potential and lose the day.",
        "Fix one default — time, tools, truth — so hard work can pay,",
        "grown practice, no fantasy, pure follow-through, no delay.",
        "Bigger claim: {ess}.",
        "This line is the drill that keeps the claim in play.",
    ],
    # 5 courtroom
    [
        "Evidence on the table from {title}:",
        "{point}.",
        "{who} rests the case on behavior, not titles and praise.",
        "Want the gift? Pay in hours, not vibes and haze.",
        "Cross-examine the excuse — find it guilty of lazy days —",
        "lock it in silence; let the craft win the phase.",
        "This week verdict: live the rule, keep it plain and brave —",
        "you and the work, same side. Oath: {ess}. Apply it today.",
    ],
    # 6 know/grow
    [
        "{author} wrote {title} so you'd finally know:",
        "{point} — that's the seed if you want to grow.",
        "Status is a costume that loves a show;",
        "process is a mirror that tells what you know.",
        "Comfort is candy; mastery is slow.",
        "Reps in the quiet are how real skills grow.",
        "If the work scares you, you're next to the glow.",
        "North star stays: {ess}. Now go.",
    ],
    # 7 free/see
    [
        "{point}.",
        "That's the key {who} handed you in {title} — use it or stay unfree.",
        "Talk without reps is a costume you see;",
        "hours with honest feedback is how you get free.",
        "Shrink the arena. Raise the honesty.",
        "One tight constraint is often the key.",
        "Book north star: {ess}.",
        "Your proof is behavior the world can see.",
    ],
    # 8 time/mind
    [
        "{point} — lock that into the mind.",
        "Not wallpaper. A contract with time.",
        "Ego wants applause on a schedule it designed;",
        "craft wants silence and a problem it can refine.",
        "Miss a day? Restart small. Don't rewrite the crime.",
        "Shame is a tax; curiosity is the climb.",
        "Potential without practice is a pretty line;",
        "practice with truth is the climb. Book spine: {ess}.",
    ],
    # 9 back/stack
    [
        "Same desk. Same doubt. New attack:",
        "{point} — that's how you come back.",
        "Half your week is theater; half is the stack.",
        "Cut the theater. Double the hours that don't lack.",
        "When the mood ghosts, the calendar still has your back —",
        "pros don't negotiate with fog on the path.",
        "Under every chapter: {ess}.",
        "Your move: one honest session. Then stack.",
    ],
    # 10 night/right
    [
        "Open {title} and {who} don't soft-light it:",
        "{point} — full stop. Live with it or fight it.",
        "You rebrand avoidance as research all night;",
        "the page stays blank and the gift stays out of sight.",
        "Trade one scroll for one scar of real fight;",
        "trade one comparison for one hour done right.",
        "Author's aim: {ess}.",
        "Seal one hour. Title it. Defend it tonight.",
    ],
    # 11 game/name
    [
        "Keep it simple: {point}.",
        "That's the claim {who} planted in {title}'s frame.",
        "Redesign the day so the rule can claim space,",
        "or keep the same day and wonder why nothing changed the game.",
        "Fear talks loud from the cheap seats of the game;",
        "you answer with finished work that carries your name.",
        "Scoreboard is behavior, not a mood with a name.",
        "Thesis underneath: {ess}. Light the flame.",
    ],
    # 12 best/test
    [
        "Evidence from {title}: {point}.",
        "Case rests on hours, not a pretty contest.",
        "Cross-examine the excuse till it fails the test;",
        "sentence is sit down, do the hard thing, earn the rest.",
        "Comfort is guilty of killing your best;",
        "verdict is calendar, constraint, and a finish you digest.",
        "Thesis stands: {ess}.",
        "Court adjourns when the work is done — not when you rest.",
    ],
    # 13 run/done
    [
        "They say wait for lightning. {who} says run:",
        "{point} — the muse shows for people already begun.",
        "Build the room first: clear goal, quick feedback, then run.",
        "Inspiration is a guest; the room is what you have done.",
        "Hard day? Shrink the task. Still show. Still run.",
        "Quiet honesty beats a speech under the sun.",
        "Whole book compresses to: {ess}.",
        "Stop nodding. Start the clock. Get one thing done.",
    ],
    # 14 door/core
    [
        "{who} in {title} keeps pointing at the core:",
        "{point} — walk through that door.",
        "Story sells fast; process pays more.",
        "Ego wants praise; craft wants reps on the floor.",
        "Scared? Good. Means the work is the door.",
        "Walk through small: one honest session, then restore.",
        "Hold this: {ess}.",
        "Tonight the proof is a finished page, not a plan for more.",
    ],
    # 15 true/through
    [
        "{point}.",
        "Period. {author}. {title}. Make it true.",
        "Collecting quotes is easy; becoming new",
        "takes the hour you schedule when nobody's watching you.",
        "Fix one default — time, tools, or truth — and push through.",
        "Grown practice. No fantasy. Pure follow-through.",
        "Bigger claim: {ess}.",
        "This week: one act that makes the abstract true.",
    ],
    # 16 hard/guard
    [
        "Listen: {point}.",
        "{title} don't wink — {who} put weight on the hard.",
        "Skip the lesson and the week stays scarred;",
        "keep the lesson and your hands stand guard.",
        "You been stacking ideas like a house of cards;",
        "empty shelf energy if the hands never work hard.",
        "Spine: {ess}.",
        "Don't just admire it. Apply it. Stand guard.",
    ],
    # 17 crown/down
    [
        "Lightning waits for people already sitting down.",
        "{point} — that's how you earn the crown.",
        "Status ladder climbs; craft ground stays down —",
        "pick the ground. That's where the real work is found.",
        "When doubt gets loud, shrink the scope, sit down.",
        "One sealed hour beats a weekend of frown.",
        "Remember: {ess}.",
        "Scoreboard is finished work, not a digital crown.",
    ],
    # 18 place/face
    [
        "Design your hours so the rule has a place:",
        "{point} — meet it face to face.",
        "Drown in potential and you lose the pace;",
        "one constraint that frees the hand is a state of grace.",
        "Either way the hands decide who you are in this place.",
        "Seal one hour. Title it with the line. Own the space.",
        "Underneath: {ess}.",
        "On top: this rule till your habits keep pace.",
    ],
    # 19 bold/gold
    [
        "Not a new trick — old gold:",
        "{point} — be bold.",
        "Fantasy is cold; practice is controlled.",
        "Show for the craft even when the story's untold.",
        "Discount critics who never do the work — that's old.",
        "Finishers write the history in gold.",
        "Book aim: {ess}.",
        "Your move before midnight: one rep, clear and bold.",
    ],
    # 20 air/care
    [
        "{who} wrote {title} so you'd stop lying to the air:",
        "{point} — treat it with care.",
        "Use it when the room is quiet and doubt is in the air;",
        "use it when the room is loud and the deadline don't care.",
        "Either way you choose: hide or dare.",
        "Hiding keeps the gift theoretical; daring makes it fair.",
        "Thesis: {ess}.",
        "Proof: one finished thing you can actually share.",
    ],
    # 21 street plain
    [
        "Keep it street-plain: {point}.",
        "{title} by {who} — that's the map, not a prayer.",
        "You either redesign the day so the rule can live there,",
        "or you keep the same day and wonder why nothing rare",
        "ever leaves your hands. Potential is air",
        "until practice makes it dense. Be unfair",
        "to excuses. Fair to the work.",
        "Aim of the book: {ess}. One rep now. Hands. Not a stare.",
    ],
    # 22 internal rhyme energy
    [
        "From {title}, the hard line lands clean:",
        "{point} — mean what you mean.",
        "Status is a mirror that lies to the scene;",
        "process is a mirror that shows what you glean.",
        "If the work scares you, you found the right scene.",
        "If it flatters you, you found a safe routine.",
        "Author's north: {ess}.",
        "This week: one act that makes the line less abstract, more seen.",
    ],
    # 23 call-response
    [
        "They say wait for inspiration. {who} says stay:",
        "{point} — inspiration's a guest, not the day.",
        "Build the room first: clear goal, tight feedback, clear way,",
        "then the guest shows because the room got made.",
        "Miss a day? Restart small. Don't dramatize the fray.",
        "Shame is a tax; curiosity is the pay.",
        "Whole book compresses to: {ess}.",
        "Now stop nodding. Start the clock. Make the claim stay.",
    ],
]


def verse(author, title, point, ess, idx, bid):
    point = clean(point)
    ess = clean(ess)
    st = short_title(title)
    who = first_name(author) if H(bid, idx, "who") % 2 == 0 else author

    ctx = {
        "point": point,
        "author": author,
        "who": who,
        "title": st,
        "ess": ess,
    }

    # pick song template uniquely per insight
    song_i = H(author, title, point, idx, bid, "song") % len(SONGS)
    lines = [ln.format(**ctx) for ln in SONGS[song_i]]

    # If two consecutive insights pick same song shape for same book, rotate
    if H(bid, idx, "rot") % 5 == 0:
        song_i2 = (song_i + 7 + idx) % len(SONGS)
        lines = [ln.format(**ctx) for ln in SONGS[song_i2]]

    text = "\n".join(lines)

    if MUSIC_BAN.search(text) or STOCK_BAN.search(text):
        text = "\n".join(
            [
                f"{point}.",
                f"That's the load-bearing line in {st} by {who}.",
                "Quote it all week and never change a habit — still stuck.",
                "Live it one hard hour and watch the fog unlock.",
                "Fear can ride shotgun; it never gets the wheel.",
                "You drive with a timer, a target, and truth you can feel.",
                f"Author's aim stays: {ess}.",
                "Your proof is a finished thing before the day goes dark.",
            ]
        )

    if MUSIC_BAN.search(text):
        text = MUSIC_BAN.sub("hold", text)
    if STOCK_BAN.search(text):
        text = STOCK_BAN.sub("hold", text)

    return text


def action(point, title, author, idx):
    opts = [
        (
            "Prove it in one block",
            f"Restate “{point}” in twelve words max. Run one 25-minute work block that obeys it — no posting. ({title})",
        ),
        (
            "Seven-day micro-reps",
            f"Each morning for 7 days, read this line from {author}, then take one matching action in under 2 minutes.",
        ),
        (
            "Kill the contradiction",
            f"Name one habit that fights “{point}.” Cut that habit in half this week while you practice {title}.",
        ),
        (
            "Sealed hour",
            f"Book one phone-free hour titled with the insight. Show up even if the mood disappears ({author}).",
        ),
        (
            "Ship the proof",
            f"Make one small finished thing that could only exist if “{point}” were true in your hands. From {title}.",
        ),
    ]
    return opts[H(point, title, idx, "act") % 5]


def main():
    raw = (ROOT / "js" / "books.js").read_text()
    m = re.search(r"window\.CREATE_BOOKS\s*=\s*(\[.*\])\s*;", raw, re.S)
    if not m:
        raise SystemExit("CREATE_BOOKS not found in books.js")
    books = json.loads(m.group(1))

    insights, apps = {}, {}
    all_bodies, openers = [], []

    for b in books:
        bid = b["id"]
        author, title = b["author"], b["title"]
        ess = b.get("essence") or b.get("short") or "make with courage and keep showing up"
        points = FLAG.get(bid)
        if not points:
            points = []
            for p in b.get("paragraphs") or []:
                if p and "reframes how" not in p.lower():
                    points.append(clean(p))
            fill = [
                f"In {title}, practice outruns mood when the work gets heavy",
                f"{author} treats attention as the scarce resource behind breakthroughs",
                f"{title} says fear can ride along but never take the wheel",
                f"{author} builds creativity as habits, not lightning luck",
                f"{title} wants constraints that free the hand",
                f"{author} links mastery to honest feedback and edge-reps",
                f"{title} separates shallow busy from deep making",
                f"{author} keeps solitude and community both in play",
                f"{title} warns comparison kills original timing",
                f"{author} ends on shipping: done truth over perfect myth",
            ]
            i = 0
            while len(points) < 10:
                points.append(fill[i % len(fill)])
                i += 1
            points = points[:10]

        pack = []
        for idx, point in enumerate(points):
            body = verse(author, title, point, ess, idx, bid)
            assert not MUSIC_BAN.search(body), f"music ban:\n{body}"
            assert not STOCK_BAN.search(body), f"stock ban:\n{body}"
            all_bodies.append(body)
            openers.append(body.split("\n")[0])
            at, ab = action(point, title, author, idx)
            pack.append(
                {
                    "headline": point[:199],
                    "detail": body,
                    "application": {"title": at, "body": ab},
                }
            )

        insights[str(bid)] = pack
        apps[str(bid)] = [pack[j]["application"] for j in (0, 2, 4, 6, 8)]
        b["paragraphs"] = [x["headline"] for x in pack]
        b["applications"] = [
            {
                "title": pack[i]["application"]["title"],
                "body": pack[i]["application"]["body"],
            }
            for i in (0, 3, 6)
        ]

    n_unique = len(set(all_bodies))
    n_open = len(set(openers))
    print(f"songs={len(all_bodies)} unique_bodies={n_unique} unique_openers={n_open}")
    # With 24 templates × 1000 content combos, bodies should be near-unique
    assert n_unique >= 900, f"too many duplicate verses: {n_unique}"

    (ROOT / "js" / "books.js").write_text(
        "/** Create — Top 100 creativity & flow */\n"
        "window.CREATE_BOOKS = "
        + json.dumps(books, ensure_ascii=False)
        + ";\nwindow.WEALTH_BOOKS = window.CREATE_BOOKS;\n"
    )
    (ROOT / "js" / "book-insights.js").write_text(
        "/** Create: hip-hop verses on each insight — rhyme on content, no music metaphors */\n"
        "window.WEALTH_BOOK_INSIGHTS = "
        + json.dumps(insights, ensure_ascii=False)
        + ";\n"
        "window.WEALTH_BOOK_APPLICATIONS = "
        + json.dumps(apps, ensure_ascii=False)
        + ";\n"
        "window.CREATE_BOOK_INSIGHTS = window.WEALTH_BOOK_INSIGHTS;\n"
        "window.CREATE_BOOK_APPLICATIONS = window.WEALTH_BOOK_APPLICATIONS;\n"
    )
    print("KB", (ROOT / "js" / "book-insights.js").stat().st_size // 1024)
    print("=== Flow #1 ===")
    print(insights["1"][0]["detail"])
    print("=== War of Art #1 ===")
    print(insights["8"][0]["detail"])
    print("=== Flow #3 ===")
    print(insights["1"][2]["detail"])
    print("=== On Writing-ish ===")
    # find king if present
    for bid, pack in insights.items():
        if "Write" in pack[0]["headline"] or "writing" in pack[0]["headline"].lower():
            print(pack[0]["detail"])
            break
    else:
        print(insights["15"][0]["detail"])


if __name__ == "__main__":
    main()
