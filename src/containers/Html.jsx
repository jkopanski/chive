/* @flow */
import React from 'react'

export type Props = {
  title: string,
  description: string,
  scripts: Array<string>,
  state?: Object,
  children: string
}

const styles = {
  margin: 0,
  padding: 0,
  height: '100%'
}

const Html = ({title, description, scripts, state, children}: Props) =>
  <html style={styles} lang='en'>
    <head>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link
        href='https://fonts.googleapis.com/css?family=Roboto:400,300,500'
        rel='stylesheet'
        type='text/css'
      />
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />
    </head>
    <body style={styles}>
      <div
        id='root'
        style={styles}
        dangerouslySetInnerHtml={{ __html: children }}
      />
      {state &&
        <script dangerouslySetInnerHtml={{ __html:
          `window.__INITIAL_STATE__=${JSON.stringify(state)}` }}
        />
      }
      {scripts.map(script =>
        <script key={script} src={script} />
      )}
    </body>
  </html>

export default Html
