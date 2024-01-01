// global.d.ts

interface Window {
    tauri: {
      dialog: {
        open(options: any): Promise<any>;
        save(options: any): Promise<any>;
      };
      fs: {
        readTextFile(path: string): Promise<string>;
        writeFile(options: { file: string; contents: string }): Promise<void>;
      };
    };
  }
  