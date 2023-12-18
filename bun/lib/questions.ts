export interface IO {
  out: (message: string) => void;
  err: (message: string) => void;
  ask: (question: string) => Promise<string>;
}
