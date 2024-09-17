import Discord from "../icons/Discord";
import Github from "../icons/Github";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" relative 2xl:w-[1280px] xl:w-10/12 w-11/12 mx-auto py-12 border-t-2 border-gray-200/[0.1]">
      <div className="text-white space-y-8 font-jetbrains">
        <nav className="w-full inline-flex justify-center gap-8">
          <a
            href=""
            className="text-sm">
            Acerca
          </a>
          <a
            href=""
            className="text-sm">
            Equipo
          </a>
          <a
            href=""
            className="text-sm">
            Términos
          </a>
        </nav>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/mvnueloc"
            target="_blank">
            <Github className="size-5" />
          </a>
          <a href=" ">
            <Discord className="size-7" />
          </a>
        </div>
        <p className="text-sm text-center">
          © {currentYear} Una Línea a la Vez. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
