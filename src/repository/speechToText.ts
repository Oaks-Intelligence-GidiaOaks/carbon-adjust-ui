import EventEmitter from "eventemitter3";

type TranscriptChangeCallback = (transcript: string) => void;
type ListeningChangeCallback = (isListening: boolean) => void;

class SpeechToText extends EventEmitter {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  private transcript: string = "";
  // @ts-ignore
  private onTranscriptChange: TranscriptChangeCallback | null = null;
  // @ts-ignore
  private onListeningChange: ListeningChangeCallback | null = null;

  constructor() {
    super();
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";

      this.recognition.onresult = this.handleRecognitionResult.bind(this);
      this.recognition.onerror = this.handleRecognitionError.bind(this);

      console.log(
        "Speech recognition is available in the browser and initialised"
      );
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }

  private handleRecognitionResult(event: SpeechRecognitionEvent): void {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    this.transcript += transcript + " ";

    this.emit("transcriptChanged", this.transcript);
    console.log("transcript updated...");
  }

  private handleRecognitionError(event: SpeechRecognitionErrorEvent): void {
    switch (event.error) {
      case "network":
        console.error("Network Error: Please check your internet connection.");
        break;
      case "no-speech":
        console.error("No speech detected. Please try speaking again...");
        break;
      case "not-allowed":
        console.error("Permission to use microphoone was denied");
        break;
      case "audio-capture":
        console.error(
          "Microphone not accessible. Please check your microphone settings"
        );
        break;
      default:
        console.error("An unknow error occured");
    }

    this.stopListening();
  }

  public startListening(): void {
    this.clearTranscript();

    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;

      this.emit("isListening", true);
      console.log("started listening...");
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;

      this.emit("isListening", false);
      console.log("stopped listening...");
    }
  }

  public toggleListening(): void {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  public setOnTranscriptChange(
    callback: TranscriptChangeCallback | null
  ): void {
    this.onTranscriptChange = callback;
  }

  public setOnListeningChange(callback: ListeningChangeCallback | null): void {
    this.onListeningChange = callback;
  }

  public getTranscript(): string {
    return this.transcript;
  }

  public clearTranscript(): void {
    this.transcript = "";
    this.emit("transcriptChanged", "");

    // if (this.onTranscriptChange) {
    //   this.onTranscriptChange("");
    // }
  }
}

export const SpeechToTextService = new SpeechToText();
