import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: 'Start Solving a Mystery 🕵️‍♂️',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Cipher-Files Mystery Game',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading Cipher-Files ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Post Created! Launching Game...' });
    ui.navigateTo(post);
  },
});
