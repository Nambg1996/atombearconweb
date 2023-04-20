export function Header({title}) {

  document.title=title

    /* 
    <Header title="ＦＣＳ生産状況確認ページ"/>
    */
  const jsx = (
    <div className="row">
      <h1 className="text-center mt-2 animate__animated animate__pulse">
        {title}
      </h1>
    </div>
  );
  return jsx;
}

export default Header;
