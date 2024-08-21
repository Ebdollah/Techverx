
export default function L1() {
    const people = [
        {
          id: 0,
          name: "Creola Katherine Johnson",
          profession: "mathematician",
          accomplishment: "spaceflight calculations",
          imageId: "MK3eW3A"
        },
        {
          id: 1,
          name: "Mario José Molina-Pasquel Henríquez",
          profession: "chemist",
          accomplishment: "discovery of Arctic ozone hole",
          imageId: "mynHUSa"
        },
        {
          id: 2,
          name: "Mohammad Abdus Salam",
          profession: "physicist",
          accomplishment: "electromagnetism theory",
          imageId: "bE7W1ji"
        },
        {
          id: 3,
          name: "Percy Lavon Julian",
          profession: "chemist",
          accomplishment:
            "pioneering cortisone drugs, steroids and birth control pills",
          imageId: "IOjWm71"
        },
        {
          id: 4,
          name: "Subrahmanyan Chandrasekhar",
          profession: "astrophysicist",
          accomplishment: "white dwarf star mass calculations",
          imageId: "lrWQx8l"
        },
        {
          id: 5,
          name: "Ada Lovelace",
          profession: "chemist",
          accomplishment: "first computer algorithm",
          imageId: "l6W2d0t"
        },
        {
          id: 6,
          name: "Alan Turing",
          profession: "mathematician",
          accomplishment: "founder of computer science",
          imageId: "z8f9b1J"
        },
        {
          id: 7,
          name: "James Clerk Maxwell",
          profession: "physicist",
          accomplishment: "theory of electromagnetism",
          imageId: "T6o9P7Q"
        },
        {
          id: 8,
          name: "Katherine Johnson",
          profession: "mathematician",
          accomplishment: "orbital mechanics calculations",
          imageId: "FZ0x6Qo"
        },
        {
          id: 9,
          name: "Niels Bohr",
          profession: "physicist",
          accomplishment: "atomic model theory",
          imageId: "R7t9K3F"
        }
    ];
    const getImageUrl = function(person) {
        return (
          'https://i.imgur.com/' +
          person.imageId +
          's.jpg'
        );
      }
      
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
