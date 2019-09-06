using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
  public class ConnectionModel
    {
        private List<string> emails = new List<string>();
        public List<string> connectionIds = new List<string>();
        private List<bool> showOnline = new List<bool>();
        public string currentChat { get; set; }
        public  string userId { get; set; }
        public ConnectionModel(string userId)
        {
            this.userId = userId;
        }
        public ConnectionModel(string userId, string connectionId)
        {
            this.userId = userId;
            this.connectionIds.Add(connectionId);
        }
        public ConnectionModel(string userId, string connectionId, string[] emails, bool[] online)
        {
            this.userId = userId;
            this.connectionIds.Add(connectionId);
            for(int i = 0; i < emails.Length; i++)
            {
                this.addEmail(emails[i], online[i]);
            }
        }
        public string[] getEmails()
        {
            return this.emails.ToArray();
        }
        public string[] getEmails(ref bool[] online)
        {
            online = this.showOnline.ToArray();
            return this.emails.ToArray();
        }
        public bool addEmail(string email, bool online)
        {
            if (!this.emails.Contains(email))
            {
                this.emails.Add(email);
                this.showOnline.Add(online);
                return true;
            }
            return false;
        }
        public bool removeEmail(string email)
        {
            int index = this.emails.IndexOf(email);
            if(index > -1)
            {
                this.emails.Remove(email);
                this.showOnline.RemoveAt(index);
                return true;
            }
            return false;
        }
        public bool emailOnline(string email)
        {
            int index = this.emails.IndexOf(email);
            if (index > -1)
            {
                return this.showOnline[index];
            }
            return false;
        }
        public void setEmailOnlineStatus(string email, bool onlineStatus)
        {
            int index = this.emails.IndexOf(email);
            if(index > -1)
            {
                this.showOnline[index] = onlineStatus;
            }
        }
        public string[] getOnlineEmails()
        {
            List<string> emails = new List<string>();
            for(int i = 0; i > emails.Count; i++)
            {
                if (showOnline[i])
                {
                    emails.Add(this.emails[i]);
                }
            }

            return emails.ToArray();
        }
    
    }
}
