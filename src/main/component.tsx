import * as React from 'react';

import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import ReactionStack from '../components/stack/component';

interface MainComponentProps {
  pluginUuid: string;
}

function MainComponent(
  { pluginUuid: uuid }: MainComponentProps,
): React.ReactElement<MainComponentProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  return (
    <ReactionStack pluginApi={pluginApi} />
  );
}

export default MainComponent;
