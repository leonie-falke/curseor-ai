import * as vscode from 'vscode';

export class CursedPanelProvider implements vscode.WebviewViewProvider {
  private startTime: number;

  constructor(private readonly _extensionUri: vscode.Uri, startTime: number) {
    this.startTime = startTime;
  }

  resolveWebviewView(webviewView: vscode.WebviewView) {
    const webview = webviewView.webview;
    webview.options = { enableScripts: true };
    webview.html = this._getHtml(webview);
    this.scheduleGlitch(webview);
  }

  private scheduleGlitch(webview: vscode.Webview) {
    const timer = this.getDynamicTimer();
    setTimeout(() => {
      const factor = this.getGlitchFactor();
      webview.postMessage({ type: 'glitch', factor });
      this.scheduleGlitch(webview);
    }, timer);
  }

  private getDynamicTimer(): number {
    const elapsed = Date.now() - this.startTime;
    const base = 60000; // 1 min
    const maxExtra = 240000; // bis zu 4 min
    const factor = Math.min(elapsed / 600000, 1);
    return base + factor * maxExtra + Math.random() * 60000;
  }

  private getGlitchFactor(): number {
    const elapsed = Date.now() - this.startTime;
    return 1 + Math.min((elapsed / 600000) * 4, 4); // Faktor 1–5
  }

  private _getHtml(webview: vscode.Webview): string {
    const css = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'glitch.css')
    );

    const messages = [
      'It watches you type…',
      'The IDE knows your secrets…',
      'You cannot escape…',
      'Glitches are coming…'
    ];

    return /* html */ `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link href="${css}" rel="stylesheet" />
        </head>
        <body>
          <div id="entity">👁</div>
          <p id="message">Awaiting cosmic disturbance...</p>
          <pre id="ascii"></pre>
          <script>
            const msg = document.getElementById('message');
            const entity = document.getElementById('entity');
            const ascii = document.getElementById('ascii');
            const messages = ${JSON.stringify(messages)};

            function getRandomMessage() {
              return messages[Math.floor(Math.random() * messages.length)];
            }

            function getRandomAsciiGlitchEscalating(factor) {
              const chars = ['░','▒','▓','█','▲','▼','■','□','●','○','☠','✦'];
              let str = '';
              const totalChars = 200 * factor;
              const width = 40;
              for (let i = 0; i < totalChars; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
                if (i % width === 0) str += '\\n';
              }
              return str;
            }

            window.addEventListener('message', e => {
              if (e.data.type === 'glitch') {
                const factor = e.data.factor;
                document.body.classList.add('glitch');
                entity.textContent = '🕳';
                msg.textContent = getRandomMessage();
                ascii.textContent = getRandomAsciiGlitchEscalating(factor);
                setTimeout(() => document.body.classList.remove('glitch'), 300 / factor);
              }
            });
          </script>
        </body>
      </html>
    `;
  }
}
