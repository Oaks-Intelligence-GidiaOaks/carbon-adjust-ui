import axios from "axios";
import EventEmitter from "eventemitter3";

type AudioDataCallback = (audioBlob: Blob) => void;
type RecordingStateCallback = (isRecording: boolean) => void;

class AudioRecorder extends EventEmitter {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording: boolean = false;
  private onAudioData: AudioDataCallback | null = null;
  private onRecordingState: RecordingStateCallback | null = null;
  private audioPlayer: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private isTranscribing: boolean = false;
  // private transc

  constructor() {
    super(); // Initialize EventEmitter
  }

  public async startRecording(): Promise<void> {
    if (this.isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        console.log(event, "on data available");

        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });

        if (this.onAudioData) {
          this.onAudioData(audioBlob);
          this.emit("audioData", audioBlob);
        }
        this.audioChunks = [];
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.emit("isRecording", true);

      if (this.onRecordingState) {
        this.onRecordingState(true);
      }

      console.log("recording started...");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public stopRecording(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    this.mediaRecorder.stop();
    this.isRecording = false;
    this.emit("isRecording", false);
    if (this.onRecordingState) {
      this.onRecordingState(false);
    }

    console.log("recording stopped....");
  }

  public pauseRecording(): void {
    if (this.mediaRecorder && this.isRecording && !this.isPaused) {
      this.mediaRecorder.pause();
      this.mediaRecorder.requestData();
      this.isPaused = true;
      this.emit("isPaused", true);

      console.log("Recording Paused...");
    }
  }

  public resumeRecording(): void {
    if (this.isPaused && this.mediaRecorder) {
      this.mediaRecorder.resume();
      this.isPaused = false;
      this.emit("isPaused", false);

      console.log("Recording resumed...");
    }
  }

  public toggleRecording(): void {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  public toggleOngoingRecording(): void {
    if (!this.mediaRecorder) {
      this.startRecording();
    } else if (this.isPaused) {
      this.resumeRecording();
    } else {
      this.pauseRecording();
    }
  }

  public async playRecordedAudio(): Promise<void> {
    console.log("play recording clicked");
    console.log("audio chunks", this.audioChunks);

    try {
      if (this.audioChunks.length > 0) {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (this.audioPlayer) {
          this.audioPlayer.pause();
          this.audioPlayer.src = audioUrl;
        } else {
          this.audioPlayer = new Audio(audioUrl);
        }

        await this.audioPlayer.play();
        this.isPlaying = true;
        this.emit("isPlaying", true);

        this.audioPlayer.onended = () => {
          this.pauseRecordedAudio();
        };

        console.log("Playing recorded audio...");
      } else {
        console.log("No audo chunks available to play...");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public pauseRecordedAudio(): void {
    console.log("pause recoridng clicked...");

    if (this.audioPlayer && this.isPlaying) {
      this.audioPlayer.pause();
      this.isPlaying = false;
      this.emit("isPlaying", false);
      console.log("Audio playback paused.");
    }
  }

  public toggleRecordedAudio(): void {
    if (this.isPlaying) {
      this.pauseRecordedAudio();
    } else {
      this.playRecordedAudio();
    }
  }

  public discardRecording(): void {
    this.audioChunks = [];

    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }

    this.isRecording = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.mediaRecorder = null;

    this.emit("isRecording", false);
    this.emit("isPlaying", false);
    this.emit("isPaused", false);
    this.emit("audioData", null);

    console.log("Recording discarded");
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

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public clearAudioChunks(): void {
    this.audioChunks = [];
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer = null;
    }

    this.emit("clearRecording");
  }

  public async transcribeAudio(): Promise<string> {
    // Method: 1 send the audio file to an api
    // Method: 2 usng azure speech to text api for the translation here

    try {
      if (this.audioChunks.length === 0 && !this.isTranscribing)
        throw new Error("No audio data available for transcription.");

      this.isTranscribing = true;
      this.emit("isTranscribing", true);

      const audioBlob = new Blob(this.audioChunks, { type: "audio/m4a" });

      console.log(audioBlob, "blob file");

      let formData = new FormData();
      formData.append("audio_file", audioBlob);

      const res = await axios.post(
        `https://ai-api-staging.pollsensei.ai/v1/carbon-adjust/chat/transcribe-audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      return res.data;
    } catch (err: any) {
      this.isTranscribing = false;
      this.emit("isTranscribing", false);
      throw new Error(err.message);
    }
  }
}

export const AudioRecorderService = new AudioRecorder();
