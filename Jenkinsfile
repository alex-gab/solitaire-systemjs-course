stage('CI') {
    node {
    
        checkout scm
    
        // pull dependencies from npm
        // on windows use: bat 'npm install'
        sh 'npm install'
    
        // stash code & dependencies to expedite subsequent testing
        // and ensure same code & dependencies are used throughout the pipeline
        // stash is a temporary archive
        stash name: 'everything', 
              excludes: 'test-results/**', 
              includes: '**'
        
        // test with PhantomJS for "fast" "generic" results
        // on windows use: bat 'npm run test-single-run -- --browsers PhantomJS'
        sh label: 'Run browser tests',
           script: 'npm run test-single-run -- --browsers PhantomJS'
           
        // archive karma test results (karma is configured to export junit xml files)
        junit 'test-results/**/test-results.xml'
              
    }


    node('linux') {
        sh 'ls'
        sh 'rm -rf *'
        sh label: 'List files',
           script: 'ls -al'
        unstash 'everything'
        sh 'ls'
    }
}

stage('Browser Testing') {
   parallel chrome: {
        runTests('PhantomJS')
    }, firefox: {
        runTests('PhantomJS')
    }, safari: {
        runTests('PhantomJS')
    }
}

stage('Pause for staging deployment') {
    input 'Deploy to staging?'    
}

milestone label: 'Stage deploy lock'
stage('Deploy to staging') {
    node {
        sh label: 'Add build number to home page',
            script: "echo '<h1>${env.BUILD_DISPLAY_NAME}</h1>' >> app/index.html"
    
        sh label: 'Build image and deploy',
            script: 'docker-compose up -d --build'
    }
}

def runTests(browser) {
    node {
      sh 'rm -rf *'
      unstash 'everything'
      sh "npm run test-single-run -- --browsers $browser"
      junit 'test-results/**/test-results.xml'
    }
}
