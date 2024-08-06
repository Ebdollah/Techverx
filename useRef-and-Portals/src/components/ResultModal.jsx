import React from 'react'

function ResultModal({result, targetTime}) {
  return (
    <dialog className='result-modal' open>
        <h2>Your {result}</h2>
        <p>Target time: <strong>{targetTime}</strong></p>
        <form method='dialog'>
        <button>Close</button>
        </form>
    </dialog>
  )
}

export default ResultModal