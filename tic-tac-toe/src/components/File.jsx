// function File() {
//   const [feedback, setFeedback] = React.useState({ feed: "", name: "" });
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFeedback((prev) => ({ ...prev, [name]: value }));
//   }
//   return (
//     <>
//       <section id="feedback">
//         <h2>Please share some feedback</h2>
//         <p>
//           <label>Your Feedback</label>
//           <textarea name="feed" value={feedback.feed} onChange={handleChange} />
//         </p>
//         <p>
//           <label>Your Name</label>
//           <input
//             name="name"
//             type="text"
//             value={feedback.name}
//             onChange={handleChange}
//           />
//         </p>
//       </section>
//       <section id="draft">
//         <h2>Your feedback</h2>

//         <Review student={feedback.name} feedback={feedback.feed} />

//         <p>
//           <button>Save</button>
//         </p>
//       </section>
//     </>
//   );
// }
