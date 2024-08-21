import React from "react";

const Form = React.forwardRef(function Form(props, ref) {
    const cls = React.useRef();
    React.useImperativeHandle(ref,()=>{
        return{
            clear(){
                cls.current.reset();
            },
        };
    });

    return (
      <form ref={cls}>
        <p>
          <label>Name</label>
          <input type="text" />
        </p>
  
        <p>
          <label>Email</label>
          <input type="email" />
        </p>
        <p id="actions">
          <button>Save</button>
        </p>
      </form>
    );
  })

  export default Form;
  