import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: "project",
  description: "Discover & Share AI prompts"
}

const Root = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
      </body>
    </html>
  )
}

export default Root
