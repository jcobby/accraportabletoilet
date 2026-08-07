# Drop original photos here

Save the originals under these exact names, then run:

```bash
npm run photos
```

The script crops black letterbox bars off screenshots, resizes, compresses and files
each one into `public/images/`. Originals stay here untouched — re-running never
degrades quality.

## Expected names

| Filename | The shot |
| --- | --- |
| `trailer-2door-street.jpg` | 2-door trailer at the kerb, turf steps, palm in frame |
| `trailer-2door-garden.jpg` | 2-door trailer in a compound, curved roof, lights over both doors |
| `trailer-2door-angle.jpg` | 2-door trailer from the rear corner, spare wheel and AC cage visible |
| `trailer-3door-event.jpg` | 3-door trailer on gravel at an event, guests walking up the steps |
| `trailer-3door-lawn.jpg` | 3-door twin-axle trailer on a lawn behind a rope barrier |
| `cubicle-interior-blue.jpg` | Inside a blue standard cubicle — WC, corner basin, foot pump |
| `cubicle-interior-tan.jpg` | Inside a tan standard cubicle — WC, urinal, sanitiser dispenser |

Anything else in this folder is ignored. To add more shots later, put the file here
and add a line to `MAP` in `scripts/import-photos.mjs`.

This folder is excluded from git — originals are large and belong in the client's own
storage, not the repository.
