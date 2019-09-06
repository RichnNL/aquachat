using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AquaChatAPI.Data.Entities
{
    public class WorkspaceEntity
    {

        public WorkspaceEntity()
        {

        }
     
        public string Name { get; set; }
        public string Users { get; set; }
        public string Owner { get; set; }

        public string Workspace_ID { get; set; }

        public string Epoch { get; set; }

        public string PictureLocation { get; set; }

    
    }
}
