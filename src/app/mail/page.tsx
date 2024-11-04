import Mail from "./mail";


export default function Mailpage() {
  return (
    <div>
      <Mail defaultLayout={[20, 32, 40]} defaultCollapsed navCollapsedSize={4}/>
    </div>
  )
}
