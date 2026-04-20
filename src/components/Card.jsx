import Button from "./Button";

function Card({ title, subtitle, value, cta = "View" }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {value ? <strong>{value}</strong> : null}
      <div className="card-action">
        <Button variant="ghost">{cta}</Button>
      </div>
    </article>
  );
}

export default Card;
