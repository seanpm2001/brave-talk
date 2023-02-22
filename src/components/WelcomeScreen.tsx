import { DispatchWithoutAction } from "react";
import { useSubscribedStatus } from "../hooks/use-subscribed-status";
import { Background } from "./Background";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JoinCallSection } from "./JoinCallSection";
import { SubscriptionCTA } from "./SubscriptionCTA";
import { DownloadBrave } from "./DownloadBrave";
import React from "react";
import { Recordings } from "./Recordings";
import { SectionWithLogo } from "./SectionWithLogo";
import { BrowserProperties } from "../hooks/use-browser-properties";

interface Props {
  onStartCall: DispatchWithoutAction;
  notice?: string;
  disabled: boolean;
  hasInitialRoomName: boolean;
  browser: BrowserProperties;
}

export const WelcomeScreen: React.FC<Props> = ({
  onStartCall,
  notice,
  disabled,
  hasInitialRoomName,
  browser,
}) => {
  const subscribed = useSubscribedStatus();

  const Body: React.FC = () => {
    if (!hasInitialRoomName && browser.isBrave === false) {
      return <DownloadBrave />;
    }

    if (!browser.supportsWebRTC) {
      return (
        <SectionWithLogo
          heading="Brave Talk"
          subhead="Your iOS device appears to have Lockdown Mode enabled, which prevents Brave Talk from working."
        />
      );
    }
    return (
      <React.Fragment>
        <JoinCallSection
          subscribed={subscribed}
          browser={browser}
          onStartCall={onStartCall}
          notice={notice}
          disabled={disabled}
          hideButtons={hasInitialRoomName}
        />

        <Recordings />

        {!hasInitialRoomName && <SubscriptionCTA subscribed={subscribed} />}
      </React.Fragment>
    );
  };

  return (
    <Background>
      <Header subscribed={subscribed} />
      <div css={{ flexGrow: 1, padding: "0 12px" }}>
        <Body />
      </div>
      <Footer browser={browser} />
    </Background>
  );
};
