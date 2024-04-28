---
id: commands
aliases: []
tags: []
---

# OpenVPN
```
sudo openvpn --config ~/apps/keys/openvpn.ovpn --auth-user-pass ~/apps/keys/ldap.conf 
```


# See the json of avro
```
java -jar /home/eugene/apps/bin/avrocli/avro-tools-1.11.3.jar tojson /home/eugene/apps/projects/unext/ds-autoaltmakers/.build/avro/autoalt_pages.avro-00000-of-00001
```


# Git push current branch

```bash
git push origin `git rev-parse --abbrev-ref HEAD`
```

# Change ownership of a folder

```bash
sudo chown -R eugene:eugene . 
```

# Create ssh pem

## From the remote Meerkat machine
```
ssh-keygen -b 1024 -t dsa -v -f ~/.ssh/meerkat
cd ~/.ssh
cat meerkat.pub >> authorised_keys
mv meerkat meerkat.pem
scp eugene@meerkatpc:~/.ssh/meerkat.pem .
```

## From the local machine

```bash
#scp eugene@meerkatpc:~/.ssh/meerkat.pem ~/apps/keys/meerkat.pem
chmod 400 ~/apps/keys/meerkat.pem
```

## Ssh to the machine
```bash

ssh -i /keys/meerkat.pem eugene@meerkatpc
```


# Get actual starship credential, instead of from Rancher

```
gcloud container clusters get-credentials ds-starship-unext-dev2-app --zone asia-northeast1-a --project unext-recommender-system
```

# Shuffle member names

```
myArray=("CK" "Jens" "Paul" "Eugene" "Miao" "Chen" "Alex") && myArray=( $(shuf -e "${myArray[@]}") ) && myArray=( $(shuf -e "${myArray[@]}") ) && echo "${myArray[@]}"
```


# Login to concoure

```
fly login -t starship --concourse-url http://prod.concourse.infra.datascience-team.dev-unext.com/ --username admin
```
