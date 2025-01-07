# Podcast App - Frontend Challenge

This repo features a podcast web application, with a custom made audio player. It was a challenge for an interview which is now being updated to showcase some more recent technologies. The first version had a requirement on Redux and MUI 5 for controls. The idea for v2 is to use @tanstack/query, zustand, shadcn/ui and to do some other small adjustments.

- React with Typescript
- ~~Redux Toolkit / RTK Query~~ -> replaced with @tanstack/query and zustand on v2, check v1 for Redux version
- Vite for bundling
- MUI 5 & twin.macro (CSS-in-JS & Tailwind)
- Unit testing (Vitest)

## Instructions

To run in Development mode, use this command:

```
npm run dev
```

For Production mode you need to generate the build first if it doesn't exist. This will generate a dist folder with the final assets. After that you can run the site with the serve command:

```
npm run build
npm run serve
```

---

IMPORTANT: the endpoint used to retrieve apple podcasts uses a CORS Proxy, which may not work if you run this inside a corporate network.

### Some decisions I took (challenge version, v1):

- No CRA! It's not the recommended React bundler anymore: [Link](https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o). Going with Vite instead.
- Changed allorigins.win with corsproxy.io, had intermitent issues with the first one.
- I am using a debounce strategy for the Podcast Search.
- Podcasts don't have a "description" field for the list API, I could retrieve that one by one but given that list changes on keystrokes in the Search Bar, that's too much. I am listing "genres" instead.
- Icons for the Player are changed from Figma version, because I didn't have icons for other states available (ex. RepeatOne, RepeatAll, ShuffleOn).
- Also made some more changes from Figma version to consider responsiveness.

---

Author: David Ramos
