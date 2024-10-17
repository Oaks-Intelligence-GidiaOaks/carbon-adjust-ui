type TranscriptChangeCallback = (transcript: string) => void;
type ListeningChangeCallback = (isListening: boolean) => void;

class SpeechToText {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  private transcript: string = "";
  private onTranscriptChange: TranscriptChangeCallback | null = null;
  private onListeningChange: ListeningChangeCallback | null = null;

  constructor() {
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

    if (this.onTranscriptChange) {
      this.onTranscriptChange(this.transcript);
    }
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
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      if (this.onListeningChange) {
        this.onListeningChange(true);
      }
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      if (this.onListeningChange) {
        this.onListeningChange(false);
      }
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
    if (this.onTranscriptChange) {
      this.onTranscriptChange("");
    }
  }
}

export const SpeechToTextService = new SpeechToText();
