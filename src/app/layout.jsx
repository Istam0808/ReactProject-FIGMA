import Nav from "./components/Nav";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav/>
        {children}
      </body>
    </html>
    
  );
}
