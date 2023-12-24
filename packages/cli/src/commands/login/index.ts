import { validate as validateEmail } from 'email-validator';
import chalk from 'chalk';
import hp from '../../util/humanize-path';
import getArgs from '../../util/get-args';
import prompt from '../../util/login/prompt';
import doSamlLogin from '../../util/login/saml';
import doEmailLogin from '../../util/login/email';
import doGithubLogin from '../../util/login/github';
import doGitlabLogin from '../../util/login/gitlab';
import doBitbucketLogin from '../../util/login/bitbucket';
import { prependEmoji, emoji } from '../../util/emoji';
import { getCommandName } from '../../util/pkg-name';
import getGlobalPathConfig from '../../util/config/global-path';
import {
  writeToAuthConfigFile,
  writeToConfigFile,
} from '../../util/config/files';
import Client from '../../util/client';
import { LoginResult } from '../../util/login/types';
import { help } from '../help';
import { loginCommand } from './command';
import { updateCurrentTeamAfterLogin } from '../../util/login/update-current-team-after-login';

export default async function login(client: Client): Promise<number> {
  const { output } = client;

  // user is not currently authenticated on this machine
  const isInitialLogin = !client.authConfig.token;

  const argv = getArgs(client.argv.slice(2), {
    '--oob': Boolean,
    '--github': Boolean,
    '--gitlab': Boolean,
    '--bitbucket': Boolean,
  });

  if (argv['--help']) {
    output.print(help(loginCommand, { columns: client.stderr.columns }));
    return 2;
  }

  if (argv['--token']) {
    output.error('`--token` may not be used with the "login" command');
    return 2;
  }

  const input = argv._[1];

  let result: LoginResult = 1;

  if (input) {
    // Email or Team slug was provided via command line
    if (validateEmail(input)) {
      result = await doEmailLogin(client, input);
    } else {
      result = await doSamlLogin(client, input, argv['--oob']);
    }
  } else if (argv['--github']) {
    result = await doGithubLogin(client, argv['--oob']);
  } else if (argv['--gitlab']) {
    result = await doGitlabLogin(client, argv['--oob']);
  } else if (argv['--bitbucket']) {
    result = await doBitbucketLogin(client, argv['--oob']);
  } else {
    // Interactive mode
    result = await prompt(client, undefined, argv['--oob']);
  }

  // The login function failed, so it returned an exit code
  if (typeof result === 'number') {
    return result;
  }

  // Save the user's authentication token to the configuration file.
  client.authConfig.token = result.token;

  if (result.teamId) {
    client.config.currentTeam = result.teamId;
  } else {
    delete client.config.currentTeam;
  }

  // If we have a brand new login, update `currentTeam`
  if (isInitialLogin) {
    await updateCurrentTeamAfterLogin(
      client,
      output,
      client.config.currentTeam
    );
  }

  writeToAuthConfigFile(client.authConfig);
  writeToConfigFile(client.config);

  output.debug(`Saved credentials in "${hp(getGlobalPathConfig())}"`);

  output.print(
    `${chalk.cyan('Congratulations!')} ` +
      `You are now logged in. In order to deploy something, run ${getCommandName()}.\n`
  );

  output.print(
    `${prependEmoji(
      `Connect your Git Repositories to deploy every branch push automatically (https://vercel.link/git).`,
      emoji('tip')
    )}\n`
  );

  return 0;
}
