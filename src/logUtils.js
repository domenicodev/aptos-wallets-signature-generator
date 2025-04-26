export function getLogUtils(setOutput) {
  function log(text) {
    setOutput(prev => prev + '\n' + text);
  }
  function logHeader(text) {
    log('\n' + '='.repeat(50));
    log(' ' + text.toUpperCase());
    log('='.repeat(50) + '\n');
  }
  function clearLogs() {
    setOutput('Welcome to ED25519 Signature Generator\nPlease connect your wallet');
  }
  return { log, logHeader, clearLogs };
} 