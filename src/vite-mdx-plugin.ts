export function mdxQCMPlugin() {
  return {
    name: 'mdx-qcm-transform',
    transform(code: string, id: string) {
      if (!id.endsWith('.mdx')) return null;
      
      // Regex pour détecter la syntaxe QCM personnalisée
      const qcmRegex = /\{\*QCM de Rusty\*[\s\S]*?\}/g;
      
      let transformedCode = code;
      let match;
      
      while ((match = qcmRegex.exec(code)) !== null) {
        const qcmContent = match[0];
        
        // Parse le contenu QCM
        const parsed = parseQCMContent(qcmContent);
        
        // Remplace par un composant React
        const replacement = `<QCMDirect
  question="${parsed.question}"
  options={${JSON.stringify(parsed.options)}}
  correctIndex={${parsed.correctIndex}}
/>`;
        
        transformedCode = transformedCode.replace(qcmContent, replacement);
      }
      
      return transformedCode;
    }
  };
}

function parseQCMContent(content: string) {
  // Supprime les balises de début et fin
  const cleanContent = content.replace(/^\{\*QCM de Rusty\*/, '').replace(/\}$/, '');
  
  // Sépare les lignes
  const lines = cleanContent.split('\n').map(line => line.trim()).filter(line => line);
  
  let question = '';
  const options: string[] = [];
  let correctIndex = 0;
  
  lines.forEach((line, index) => {
    if (line.startsWith('=') && line.endsWith('=')) {
      // C'est la question
      question = line.slice(1, -1);
    } else if (/^\d+:/.test(line)) {
      // C'est une option
      const isCorrect = line.includes('***');
      const label = line.replace(/^\d+:/, '').replace(/\*{3}$/, '');
      options.push(label);
      
      if (isCorrect) {
        correctIndex = options.length - 1;
      }
    }
  });
  
  return { question, options, correctIndex };
} 