import React from 'react'

type Props = {
  setShowTextModal: React.Dispatch<React.SetStateAction<number | null>>;
  text: string;
}

const TextModal = ({text, setShowTextModal}: Props) => {
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
        <div className="relative p-8 border shadow-lg rounded-md bg-white">
        <div className="absolute right-0 top-0 h-8 w-8">

        <button onClick={() => setShowTextModal(null)} >
              <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
            </button>
            </div>
            
            <div className='max-h-[500px] overflow-y-auto'>
            {text.split(/\n/).map((line, index) =>
            line ? <p key={index}>{line}</p> : <br key={index} />
          )}
            </div>

          </div>
        </div>
  )
}

export default TextModal