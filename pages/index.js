import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  // funcionalidad del Boton para llamar a la API
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Habla con D10S</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Preguntale al Diego</h1>
          </div>
          <div className="header-subtitle">
            <h2>Hacele la pregunta que siempre quisiste hacerle!!!</h2>
            <h3>Pregunta:</h3>
          </div>
       
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="Tu pregunta..." 
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
             className={isGenerating ? "generate-button loading" : "generate-button"}
             onClick={callGenerateEndpoint}
            >
              <div className="generate">
             {isGenerating ? <span className='loader'></span> : <p>Preguntar?</p>}
              </div>
            </a>
          </div>
          
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Respuesta:</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}

        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
