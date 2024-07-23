---
id: enable_remote_clipboard
aliases: []
tags: []
---

To enable clipboard functionality when using SSH, you can use X11 forwarding. Here's how to set it up:

1. On the client side (your local machine):

   a. Ensure you have an X server installed and running. On Linux and macOS, this is usually pre-installed. On Windows, you might need to install an X server like Xming or VcXsrv.

   b. Use the -X or -Y flag when connecting via SSH:

   ```
   ssh -X user@remote_host
   ```

   The -X flag enables X11 forwarding with some security restrictions, while -Y enables trusted X11 forwarding.

2. On the server side (the remote machine):

   a. Make sure X11 forwarding is enabled in the SSH server configuration. Edit the `/etc/ssh/sshd_config` file and ensure this line is present and uncommented:

   ```
   X11Forwarding yes
   ```

   b. Restart the SSH service if you made changes:

   ```
   sudo systemctl restart sshd
   ```

3. After connecting, you can use X11 applications, and they should be able to access your local clipboard.

4. To copy and paste between your local machine and the remote server, you can use tools like:

   - `xclip`: 
     ```
     echo "text" | xclip -selection clipboard   # Copy to clipboard
     xclip -selection clipboard -o              # Paste from clipboard
     ```

   - `xsel`:
     ```
     echo "text" | xsel --clipboard --input     # Copy to clipboard
     xsel --clipboard --output                  # Paste from clipboard
     ```

Remember that X11 forwarding can be slower and less secure than other methods. For simple text copying, you might also consider using SSH's built-in terminal copy/paste functionality, which varies depending on your SSH client.

Would you like me to explain any part of this process in more detail?

1. Check SSH connection:
   Make sure you're connecting with X11 forwarding enabled. Use the -X or -Y flag:
   ```
   ssh -X user@remote_host
   ```

2. Verify X11 forwarding is active:
   After connecting, run this command:
   ```
   echo $DISPLAY
   ```
   If it returns something like ":10.0" or "localhost:10.0", X11 forwarding is working. If it's empty, there's a problem.

3. Check if xsel is installed:
   Run:
   ```
   which xsel
   ```
   If it's not found, install it:
   ```
   sudo apt-get install xsel  # For Debian/Ubuntu
   sudo yum install xsel      # For CentOS/RHEL
   ```

4. Test with a simple X application:
   Try running a basic X application like `xeyes` or `xclock`. If these don't work, the problem is with X11 forwarding, not specifically xsel.

5. Check SSH server configuration:
   On the remote server, ensure `/etc/ssh/sshd_config` has:
   ```
   X11Forwarding yes
   ```

6. Check SSH client configuration:
   On your local machine, ensure `/etc/ssh/ssh_config` or `~/.ssh/config` doesn't disable X11 forwarding.

7. Firewall issues:
   Ensure your firewall isn't blocking X11 traffic (typically on port 6000).

8. Try trusted X11 forwarding:
   Use -Y instead of -X:
   ```
   ssh -Y user@remote_host
   ```

9. Check for errors:
   Look at the SSH connection output for any warnings or errors related to X11 forwarding.

10. Alternative clipboard methods:
    If X11 forwarding isn't feasible, consider alternatives like `tmux` with its built-in clipboard, or tools like `pbcopy`/`pbpaste` for macOS.

If you've tried these steps and still have issues, could you provide more details about your local and remote operating systems, and any specific error messages you see when connecting with SSH -X or -Y?
