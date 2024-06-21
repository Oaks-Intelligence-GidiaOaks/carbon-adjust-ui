declare module "amazon-connect-streams" {
  interface LoginOptions {
    autoClose: boolean;
    height: number;
    width: number;
    top: number;
    left: number;
  }

  interface SoftphoneOptions {
    allowFramedSoftphone: boolean;
    disableRingtone?: boolean;
    ringtoneUrl?: string;
  }

  interface InitCCPParams {
    ccpUrl: string;
    loginPopup?: boolean;
    loginPopupAutoClose?: boolean;
    loginOptions?: LoginOptions;
    region?: string;
    softphone?: SoftphoneOptions;
  }

  namespace connect {
    namespace core {
      function initCCP(containerDiv: HTMLElement, params: InitCCPParams): void;
    }
    function agent(callback: (agent: any) => void): void;
  }

  export = connect;
}
