interface CreditButtonProps {
  link: string;
  logoSrc: string;
  imageAlt: string;
}

export function CreditButton({ link, logoSrc, imageAlt }: CreditButtonProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="bg-secondary scale-70 origin-right rounded-md hover:shadow-lg hover:shadow-main transition-all duration-200 "
    >
      <img src={logoSrc} alt={imageAlt} />
    </a>
  );
}

export default CreditButton;
