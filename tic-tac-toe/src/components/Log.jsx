import React from 'react'

function Log({logs}) {
  return (
    <div>
        <h1>Logs</h1>
        <ol id='log'>
            {logs.map((log)=>{
                return(
                    <li key={`${log.square.row}${log.square.col}`}>{log.player} Selected {log.square.row} , {log.square.col}</li>
                )
            })}
        </ol>
        
    </div>
  )
}

export default Log