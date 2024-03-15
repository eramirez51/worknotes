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