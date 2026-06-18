import { App } from "octokit";

let githubApp: App | null = null;
function getPrivateKey(): string {
  return Buffer.from(
    process.env.GITHUB_APP_PRIVATE_KEY_BINARY!,
    "base64",
  ).toString("utf-8");
}

export function getGithubApp() {
  if (!githubApp) {
    const privateKey = getPrivateKey();
    githubApp = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey,
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
    });
  }
  return githubApp;
}

export function getGithubInstallUrl(userId: string) {
  const url = new URL(`https://github.com/apps/shasa-ai/installations/new`);
  // `state` round-trips through GitHub so we can link the installation to this user.
  url.searchParams.set("state", userId);
  return url.toString();
}
