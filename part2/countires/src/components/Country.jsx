import Weather from "./Weather";

const Country = ({ country }) => {
  const {
    name: { common },
    languages,
    flags,
    capital,
    area,
  } = country;
  return (
    <div>
      <h1>{common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h2>Languages</h2>
      <ul
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        {Object.values(languages).map((lang) => (
          <li key={lang} style={{}}>
            {lang}
          </li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <Weather
        name={country.capital[0]}
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
      />
    </div>
  );
};

export default Country;
