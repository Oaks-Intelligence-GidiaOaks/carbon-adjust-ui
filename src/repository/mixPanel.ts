import mixpanel, { Mixpanel } from "mixpanel-browser";

class MixPanel {
  private mixpanel: Mixpanel;
  private isInitialized: boolean;

  constructor() {
    this.mixpanel = mixpanel;
    this.isInitialized = false;

    this.mixpanel.init(
      import.meta.env.VITE_MIX_PANEL_TOKEN || "",
      {
        debug: true,
        track_pageview: true,
        persistence: "localStorage",
        loaded: (_: Mixpanel) => {
          this.isInitialized = true;
          console.log("=========Mix Panel is ready......");
        },
      },
      "name"
    );
  }

  private ensureInitialized() {
    if (!this.isInitialized) {
      console.error("Mixpanel is not initialized yet.");
      return false;
    }
    return true;
  }

  trackEvent(event: string, properties: Record<string, any>) {
    if (this.ensureInitialized()) {
      this.mixpanel.track(event, properties);
    }
  }

  identifyUser(userId: string) {
    if (this.ensureInitialized()) {
      this.mixpanel.identify(userId);
      console.log("====USER IDENTIFIED SUCCESS========");
    }
  }

  setUserProperties(properties: Record<string, any>) {
    if (this.ensureInitialized()) {
      this.mixpanel.people.set(properties);
    }
  }

  registerSuperProperties(properties: Record<string, any>) {
    if (this.ensureInitialized()) {
      this.mixpanel.register(properties);
    }
  }

  getDefaultProperties() {
    if (this.ensureInitialized()) {
      return {
        browser: this.mixpanel.get_property("$browser"),
      };
    }
  }

  reset() {
    if (this.ensureInitialized()) {
      this.mixpanel.reset();
    }
  }
}

export default MixPanel;

export const MixPanelRepository = new MixPanel();
