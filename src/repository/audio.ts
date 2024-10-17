type AudioDataCallback = (audioBlob: Blob) => void;
type RecordingStateCallback = (isRecording: boolean) => void;

class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording: boolean = false;
  private onAudioData: AudioDataCallback | null = null;
  private onRecordingState: RecordingStateCallback | null = null;

  public async startRecording(): Promise<void> {
    if (this.isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        if (this.onAudioData) {
          this.onAudioData(audioBlob);
        }
        this.audioChunks = [];
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      if (this.onRecordingState) {
        this.onRecordingState(true);
      }

      console.log("recording started...");
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }

  public stopRecording(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    this.mediaRecorder.stop();
    this.isRecording = false;
    if (this.onRecordingState) {
      this.onRecordingState(false);
    }

    console.log("recording stopped....");
  }

  public toggleRecording(): void {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  public setOnAudioData(callback: AudioDataCallback | null): void {
    this.onAudioData = callback;
  }

  public setOnRecordingState(callback: RecordingStateCallback | null): void {
    this.onRecordingState = callback;
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }
}

export const AudioRecorderService = new AudioRecorder();
