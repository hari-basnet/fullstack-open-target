const Country = ({ country }) => {
  const {
    name: { common },
    languages,
    flags,
  } = country;
  return (
    <div>
      <h1>{common}</h1>
      <h2>Languages</h2>
      {Object.values(languages).map((lang) => (
        <li key={lang}>lang</li>
      ))}
      <img src={flags.png} />
    </div>
  );
};

export default Country;
