# Git Commands

git init - Create a new git repo
git status - View the changes to your project code
git add - Add files to staging area
git commit - Create a new commit with files from staging area
git log - View recent commits
git remote add origin git@github.com:repo-ssh-url.git - Adds a remote connection to name github repository
git remote -v - Displays verbose external remote repositories
git push -u origin master - Pushes the code from the master branch up to the origin remote repository (-u flag only need for initial push)

---

# Setting up SSH for GitHub

1. Generate ssh key (per computer)
   $ ssh-keygen -t rsa -b 4096 -C "ccorder2@gmail.com"
2. Run ssh agent
   $ eval "$(ssh-agent -s)"
3. Add ssh key to agent
   $ ssh-add ~/.ssh/id_rsa
4. Copy contents of rsa to clipboard
   $ clip < ~/.ssh/id_rsa.pub
5. Paste public key to new github RSA key
6. Make connection to github server via ssh
   $ ssh -T git@github.com
