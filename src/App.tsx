import { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './App.css'
import { requestToGroqAI } from './utils/groq';

function App() {
  const [data, setData] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const content = document.getElementById('content') as HTMLInputElement;
    const groq: string | null = await requestToGroqAI(content.value);
    setData(groq?.toString() || 'Something went wrong');
  }

  const handleSubmitWithEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  return (
    <main className='flex flex-col justify-center items-center min-h-[80vh] w-full max-w-3xl mx-auto space-y-4'>
      <div>
        <h1 className='flex justify-center items-center text-xl sm:text-3xl text-indigo-500'>Regroq AI</h1>
        <span className='text-gray-300 text-xs sm:text-sm'>Type anything you want, and see the result</span>
      </div>

      <form action="" className='flex w-full gap-1'>
        <input
          type="text"
          id='content'
          placeholder='Type something ...'
          onKeyDown={handleSubmitWithEnter}
          className='w-full border border-indigo-500 rounded-md p-2'
        />
        <button
          onClick={handleSubmit}
          type='button'
          className='border bg-indigo-500 border-indigo-500 text-white rounded-md p-2'
        >
          Run
        </button>
      </form>

      <div className='max-w-3xl w-full mx-auto text-sm sm:text-base'>
        {data ?
          <SyntaxHighlighter
            language='swift'
            style={darcula}
            wrapLines={true}
          >
            {data}
          </SyntaxHighlighter> 
          : null
        }
      </div>
    </main>
  )
}

export default App
