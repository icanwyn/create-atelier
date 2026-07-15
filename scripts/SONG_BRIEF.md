# Full hip-hop song brief (Create atelier)

Generate one complete hip-hop song per insight. Match this quality and structure.

## Gold example (user-approved)

Book: *Steal Like an Artist* — Austin Kleon  
Principle: Nothing's fully original — remix your lineage honest.

```
Yo, Austin Kleon said it best—
Nothing's fully original, we just remix the lineage, honest.
Steal like an artist... let's flip it for today.
[Chorus]
Nothing's fully original, that's the truth we inherit,
Remix your lineage, make it honest, no counterfeit.
...
[Verse 1]  — history / book teaching / lineage examples
[Chorus]
[Verse 2]  — Modern day apply it: AI, feeds, work, school, craft
[Bridge]   — reflective
[Verse 3 / Outro] — call to action, personal, send-off
```

## Required structure (every song)

1. **Cold open** (2–4 lines): name author + book, state the principle, “flip it for today”
2. **[Chorus]** (6–8 lines): sticky, repeatable, rhymed; principle in plain speech
3. **[Verse 1]** (12–16 lines): book meat — what the author teaches, lineage/history examples, how the idea works
4. **[Chorus]** (can be just the label `[Chorus]` or full repeat)
5. **[Verse 2]** (12–16 lines): **Modern day apply it** — concrete 2020s life (AI tools, phones, jobs, school, parenting, side projects, teams). Practical, not abstract.
6. **[Bridge]** (4–6 lines): slower, reflective
7. **[Verse 3 / Outro]** (8–12 lines): send-off, own the principle, end on a strong last line

## Style rules

- Real hip-hop song: multi-syllable rhyme, internal rhyme, punchlines OK
- ABOUT the book idea — do **not** make the whole song a metaphor about “music itself” as the lesson
- You **may** mention real culture (samples, TikTok, apps) as modern applications
- No stock filler: “plain as the…”, “scene:”, “endcap:”, “live the line”, empty hype
- No studio-as-metaphor spam (pocket/cipher/sixteen bars) unless literally relevant
- Keep teaching honest to the book
- End with something you can act on tomorrow

## Output format (strict)

For each insight, write a JSON object:

```json
{
  "book_id": 5,
  "insight_idx": 0,
  "headline": "…",
  "song": "full song text with newlines and [Chorus]/[Verse] labels"
}
```

Return a JSON array of all songs for your batch. No markdown fences around the whole array if writing a `.json` file — pure JSON.
