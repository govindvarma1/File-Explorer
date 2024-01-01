import { useState } from "react";
import "./App.css";

function App() {

  const [content, setContent] = useState<string>("");

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const {value} = event.target;
    setContent(value);
  }

  const handleOpenFile = async () => {
    const { filePaths } = await window.tauri.dialog.open({
      multiple: false,
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });

    if (filePaths && filePaths[0]) {
      const fileContent = await window.tauri.fs.readTextFile(filePaths[0]);
      setContent(fileContent);
    }
  };

  const handleSaveFile = async () => {
    const { filePath } = await window.tauri.dialog.save({
      defaultPath: 'untitled.txt',
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });

    if (filePath) {
      await window.tauri.fs.writeFile({ file: filePath, contents: content });
    }
  };
  

  return (
    <div className="container">
      <textarea className="w-full border-black" value={content} onChange={handleContentChange}/>
      <button onClick={handleOpenFile}>Open File</button>
      <button onClick={handleSaveFile}>Save File</button>
    </div>
  );
}

export default App;
